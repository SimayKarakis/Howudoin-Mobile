import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, Alert} from "react-native";
import { useLocalSearchParams, router} from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from './Config';

export default function OneChat() {

  const {userName = 'Unknown User'} = useLocalSearchParams();
  //console.log(userName);
  const [messages, setMessagesList] = useState<{ sender: string, messageContent: string }[]>([]);
  const [newMessage, setNewMessages] = useState("");

  // GETTING CONVERSATION HISTORY
  
  const fetchMessages = async (token: string) => {
    try {
      //console.log(userName);
      const name = Array.isArray(userName) ? userName.join(" ") : userName;
      const encodedUserName = encodeURIComponent(name);

      const response = await fetch(`http://192.168.1.6:8080/messages?requestNameLastname=${encodedUserName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {

        setNewMessages("");
        //fetchMessages(token); // Refresh messages

        const data = await response.json();
        setMessagesList(data);
      } else {
        throw new Error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      Alert.alert("Error", "Unable to fetch messages.");
    }
  };



  useEffect(() => {
    const getTokenAndFetchMessages = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        if (token) {
          await fetchMessages(token);
        } else {
          Alert.alert("Error", "Token not found. Please log in.");
          router.push("./login");
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
        Alert.alert("Error", "Unable to retrieve token.");
      }
    };

    getTokenAndFetchMessages();
  }, []);


  // SENDING A NEW MESSAGE
  const sendMessage = async () => {
    try {
      const token = await AsyncStorage.getItem("@auth_token");
      if (!token) {
        Alert.alert("Error", "Token not found. Please log in.");
        return;
      }

      const response = await fetch(`http://192.168.1.6:8080/messages/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(
        { 
          s: userName, 
          content: newMessage 
        }),
    });

      if (response.ok) {

        setNewMessages("");
        await fetchMessages(token); // Refresh messages
        
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error", "Unable to send message.");
    }
  };

  const colors = {
    user1: "#D14E43",
    user2: "#1D3557",
  };

  return(
    <View style = {appStyle.screen}>
      <View style={appStyle.headerForTabs}>
        <Text style={appStyle.leftText}>{userName}</Text>
      </View>
      <View style = {appStyle.lines}></View>
      
      <ScrollView contentContainerStyle={appStyle.scrollContent}>


        {messages.map((message, index) => (
          <View key={index} style={[appStyle.messageItem,
              { 
                alignSelf: message.sender === userName ? 'flex-start' : 'flex-end' ,
                //marginLeft: message.sender === userName ? 10 : 0,
                //marginRight: message.sender === userName ? 0 : 10,
              }
            ]}
          >
            <Text
              style={[appStyle.messengerName,
                { color: message.sender === userName ? colors.user1 : colors.user2 }
              ]}
            >{message.sender}:
            </Text>
            <Text style={appStyle.messageContent}>
              {message.messageContent}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={appStyle.footer}>
        <TextInput
          style={appStyle.messageInput}
          placeholder="Type your message..."
          onChangeText={(a) => setNewMessages(a)}
        />
        <TouchableOpacity style={appStyle.sendButton} onPress={sendMessage}>
          <Feather name="arrow-up" size={24} color="#1D3557" />
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
      marginBottom: 10
    },

    leftText: {
      marginLeft: 10,
      fontSize: 22,
      color: '#457B9D',
    },

    messageList: {
      flexGrow: 1,
    },

    messageItem: {
      flexDirection: "row",
      marginBottom: 10,
      borderBottomColor: "#E96A70",
      paddingBottom: 5,
      maxWidth: '100%',
    },

    messengerName: {
      fontSize:16,
      fontWeight: "bold",
      marginRight: 5,
      color: "#1D3557",
    },

    messageContent: {
      fontSize:16,
      color: "#000000",
      textAlign: "left",
    },

    footer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: "#FADAD4",
      borderTopWidth: 1,
      borderTopColor: "#E96A70",
    },
    messageInput: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: "#E96A70",
      marginRight: 10,
    },
    sendButton: {
      backgroundColor: "#A8DADC",
      padding: 10,
      borderWidth: 1,
      borderColor: "#457B9D",
      borderRadius: 15,
    },
});