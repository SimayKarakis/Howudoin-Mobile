import { useState, useEffect } from 'react';
import {Text, TextInput, Image, StyleSheet, Pressable, View, ScrollView, Alert, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from '@expo/vector-icons/Feather';
import {useRouter} from "expo-router";

export default function Incoming()
{
  const router = useRouter();
  const [incomingRequests, setIncomingRequests] = useState([]);

  useEffect(() => {
    const fetchIncomingRequests = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        if (!token) {
          Alert.alert("No token found, please log in again");
          return;
        }

        const response = await fetch(
          "http://172.28.96.1:8080/friends/incoming",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIncomingRequests(data);
        } else {
          Alert.alert("Error fetching incoming requests");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error fetching incoming requests");
      }
    };

    fetchIncomingRequests();
  }, []);

  function acceptFriendRequest(receivedUserName: String) {
    return async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        if (!token) {
          Alert.alert("No token found, please log in again");
          return;
        }

        const response = await fetch(
          "http://172.28.96.1:8080/friends/accept",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ s: receivedUserName }),
          }
        );

        if (response.ok) {
          Alert.alert("Friend request accepted");
          setIncomingRequests((prevRequests) =>
            prevRequests.filter((request) => request !== receivedUserName)
          );
          router.push("/tabs/chats");

        } else {
          Alert.alert("Error accepting friend request");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error accepting friend request");
      }
    };
  }

  return (
    <View style={appStyle.screen}>
      <View style={appStyle.headerForTabs}>
        <Text style={appStyle.leftText}>Incoming Friend Requests</Text>
      </View>
      <View style = {appStyle.lines}></View>

      <ScrollView contentContainerStyle={appStyle.scrollContent}>
        {incomingRequests.length > 0 ? (
          incomingRequests.map((request, index) => (
            <View key={index} style={appStyle.requestItem}>
              <Text style={appStyle.requestName}>{request}</Text>
              <TouchableOpacity onPress={acceptFriendRequest(request)}>
                <Feather name="check-square" size={24} color="#1D3557" />
              </TouchableOpacity>
            </View>
        ))): (
          <Text>No incoming friend requests</Text>
        )}
      </ScrollView>
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

  titles: {
    color: "#457B9D",
    fontSize: 32
  },

  lines: {
    height: 1,
    width: "100%",
    color: "#E96A70"
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#FADAD4"
  },

  headerForTabs:{
    height: 70,
    width: "100%",
    backgroundColor: "#FADAD4",
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#E96A70",
  },

  leftText: {
    marginLeft: 10,
    fontSize: 22,
    color: '#457B9D',
  },

  oneChat:{
    backgroundColor: "#FADAD4",
    height: 96,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E96A70"
  },

  requestItem: {
    width: "100%",
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#E96A70"
  },

  arrowContainer: {
    padding: 5,
    backgroundColor: "#A8DADC",
    borderWidth: 1,
    borderColor: "#457B9D",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7.5,
  },

  requestName: {
    marginLeft: 10,
    fontSize: 20,
    color: '#457B9D',
    flex: 1,
  },
});