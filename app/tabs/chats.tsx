import { useState, useEffect } from 'react';
import {Text, TextInput, StyleSheet, Pressable, TouchableHighlight, View, ScrollView, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from '@expo/vector-icons/Feather';
import {Link, useRouter} from "expo-router";

export default function Chats() 
{
  const router = useRouter();
  const [friends, setFriendsList] = useState<string[]>([]);;

  const fetchFriends = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8080/friends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Pass the JWT token in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFriendsList(data);
      } else {
        throw new Error("Failed to fetch friends");
      }
    } catch (error) {
      console.error("Error fetching friends:", error);
      Alert.alert("Error", "Unable to fetch friends.");
    }
  };

  useEffect(() => {
    // Retrieve the token from AsyncStorage and fetch friends if the token exists
    const getTokenAndFetchFriends = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        if (token) {
          fetchFriends(token); // Use the token to fetch friends
        } else {
          Alert.alert("Error", "Token not found. Please log in.");
          router.push("/login"); // Redirect to login if token is not found
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
        Alert.alert("Error", "Unable to retrieve token.");
      }
    };

    getTokenAndFetchFriends();
  }, []);

  return (
    <View style = {appStyle.screen}>
      <View style={appStyle.headerForTabs}>
        <Text style={appStyle.leftText}>Chats</Text>
        <Pressable onPress = {() => {router.push("/sendFriendRequest")}}>
          <Feather name="user-plus" size={22} color="black" />
        </Pressable>
      </View>
      <View style = {appStyle.lines}></View>

      <ScrollView contentContainerStyle={appStyle.scrollContent}>
        // just to see DELETE AFTER SUCCEEDING!!!
        <View>
          <View style={appStyle.friendItem}>
            <Text style={appStyle.friendName}>Simay Karakış</Text>
            <View style={appStyle.arrowContainer}>
              <TouchableHighlight onPress={() => {router.push("/oneChat")}}>
                <Feather name="arrow-right" size={16} color="#1D3557"/>
              </TouchableHighlight>
            </View>
          </View>
          <View style = {appStyle.lines}></View>
        </View>

        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <View>
              <View key={index} style={appStyle.friendItem}>
                <Text style={appStyle.friendName}>{friend}</Text>
                <View style={appStyle.arrowContainer}>
                  <Pressable onPress={() => {
                    router.push({
                      pathname: "/oneChat", 
                      params: {friendName: friend}
                    })}}>
                    <Feather name="arrow-right" size={28} color="#1D3557" />
                  </Pressable>
                </View>
              </View>
              <View style = {appStyle.lines}></View>
            </View>
          ))
        ) : (
          <Text>No friends available</Text>
        )}
        <View>
          <Link href = "/oneChat" style={appStyle.links}>oneChat</Link>
        </View>
      </ScrollView>
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

    friendItem: {
      width: "100%",
      height: 70,
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

    friendName: {
      marginLeft: 10,
      fontSize: 24,
      color: '#457B9D',
      flex: 1,
    },
});