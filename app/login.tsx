import {Text, TextInput, Image, StyleSheet, TouchableOpacity, View, Alert} from "react-native";
import {useState} from "react";
import {Link, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from './Config';


export default function Login() 
{
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function submit()
  {
    if (!userEmail || !userPassword) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    
    const requestOption = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
          {
            email: userEmail,
            password: userPassword
          }
      ),
    }

    fetch(`http://192.168.1.6:8080/login`, requestOption)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid email or password");
        }
      })
      .then((data) => {
        const token = data.token;

        AsyncStorage.setItem("@auth_token", token)
          .then(() => {
            Alert.alert("Success", "Logged in successfully!");
            router.push("./tabs/chats");
          })
          .catch((error) => {
            console.error("Error saving token:", error);
            Alert.alert("Error", "Unable to save login token.");
          });
      })
      .catch((error) => {
        Alert.alert("Login Failed", error.message);
      });
  };  
  
  return (
    <View style = {appStyle.screen}>
      <Image source={require('../assets/images/logo.png')} style = {appStyle.images}/>

      <TextInput 
          onChangeText={(a)=>setUserEmail(a)} 
          style = {appStyle.textBoxes} 
          placeholder="email"
          keyboardType="email-address"
          autoCapitalize="none">
      </TextInput>

      <TextInput 
          onChangeText={(a)=>setUserPassword(a)} 
          style = {appStyle.textBoxes} 
          placeholder="password">
      </TextInput>

      <View style={appStyle.buttons}>
          <TouchableOpacity onPress={submit}>
              <Text>LOGIN</Text>
          </TouchableOpacity>
      </View>

      <Text style={appStyle.texts}>Don't you have an account?{" "}
          <Link href="./" style={appStyle.links}>Register from here.</Link>
      </Text>
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
});