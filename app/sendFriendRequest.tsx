import { useState } from "react";
import {Text,TextInput,StyleSheet,TouchableOpacity,View,Alert,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function sendFriendRequest(){
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleSendFriendRequest = async () => {
        
        if (!email || !email.includes("@")) {
            Alert.alert("Error", "Please enter a valid email address.");
            return;
        }

        try {
          const token = await AsyncStorage.getItem("@auth_token");
          if (!token) {
            Alert.alert("Error", "Authentication token not found. Please log in.");
            router.push("/login");
            return;
          }
      
          const response = await fetch("http://localhost:8080/friends/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ requestedString: email }),
          });
      
          const success = await response.json();
          if (success) {
            Alert.alert("Success", "Friend request sent successfully!");
            router.push("/tabs/chats")
            setEmail("");
          } else {
            Alert.alert("Error", "Friend request failed. Check details or try again.");
          }
        } catch (error) {
          console.error("Error sending friend request:", error);
          Alert.alert("Error", "An unexpected error occurred.");
        }
      };
      
    return(
        <View style={appStyle.screen}>
            <Text style={appStyle.instructions}>Enter the email address of the user to whom you want to send a friend request.</Text>
            <TextInput 
                onChangeText={(a)=>setEmail(a)} 
                style = {appStyle.textBoxes} 
                placeholder="email"
                keyboardType="email-address"
                autoCapitalize="none">
            </TextInput>
        
            <View style={appStyle.buttons}>
                <TouchableOpacity onPress={handleSendFriendRequest}>
                    <Text>Send Request</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
      shadowRadius: 4
    },
  
    texts: {
      fontSize: 12,
      color: "#000",
    },
  
    links: {
      fontSize: 12,
      color: "#457B9D",
      textDecorationLine: "underline",
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
  
    images: {
      height: 80,
      width: 80,
      marginBottom: 36,
    },

    instructions: {
        color:"#E63946",
        width: "75%",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 40
    }
  });