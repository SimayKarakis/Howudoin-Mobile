import { useState } from "react";
import {Text, TextInput, StyleSheet, TouchableOpacity, View, Alert,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Config from './Config';

export default function SendFriendRequest() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const sendFriendRequest = async () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("@auth_token");
      if (!token) {
        Alert.alert("Error", "Authentication token not found. Please log in.");
        router.push("./login");
        return;
      }

      const requestOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ s: email }),
      };

      const response = await fetch(
        `http://${Config.IP_ADDRESS}:8080/friends/add`, requestOption
      );

      if (response.ok) {
        const result = await response.json();
        if (result) {
          Alert.alert("Success", "Friend request sent successfully!");
          setEmail(""); // Reset email input
        } else {
          Alert.alert(
            "Error",
            "Unable to send friend request. Please try again."
          );
        }
      } else {
        const errorData = await response.text();
        Alert.alert("Error", errorData || "Failed to send the friend request.");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <View style={appStyle.screen}>
      <Text style={appStyle.instructions}>
        Enter the email address of the user to whom you want to send a friend
        request.
      </Text>
      <TextInput
        onChangeText={(a) => setEmail(a)}
        style={appStyle.textBoxes}
        placeholder="email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={appStyle.buttons}>
        <TouchableOpacity onPress={sendFriendRequest}>
          <Text>Send Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const appStyle = StyleSheet.create({
  screen: {
    backgroundColor: "#FADAD4",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textBoxes: {
    backgroundColor: "#A2CDCF",
    width: 256,
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#1D3557",
    paddingLeft: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  buttons: {
    backgroundColor: "#A2CDCF",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 36,
    marginVertical: 16,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#1D3557",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },

  instructions: {
    color: "#E63946",
    width: "75%",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
  },
});