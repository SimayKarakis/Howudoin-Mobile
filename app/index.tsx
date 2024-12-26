import {Text, TextInput, Image, StyleSheet, TouchableOpacity, View , Alert} from "react-native";
import {useState} from "react";
import {Link, useRouter} from "expo-router";
import Config from './Config';

export default function Index() 
{
  const router = useRouter();
  
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function submit()
  {
    function afterResponse(result: string)
    {
      Alert.alert("User is registered!")
      router.push("./login");
    }

    const requestOptions = {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(
        {
          name: userName,
          lastName: userLastName,
          email: userEmail,
          password:  userPassword
        }
      )
    }

    fetch(`http://192.168.1.6:8080/register`, requestOptions)
      .then((response) => response.text())
      .then((result) => afterResponse(result))
      .catch((error) => console.error(error))

  }

  return (
    <View style={appStyle.screen}>

      <Image source={require('../assets/images/logo.png')} style = {appStyle.images}/>
      
      <TextInput 
        onChangeText={(a)=>setUserName(a)} 
        style = {appStyle.textBoxes} 
        placeholder="name">
      </TextInput>

      <TextInput 
        onChangeText={(a)=>setUserLastName(a)} 
        style = {appStyle.textBoxes} 
        placeholder="last name">  
      </TextInput>

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
            <Text>REGISTER</Text>
        </TouchableOpacity>
      </View>

      <Text style={appStyle.texts}>
        Do you have an account?{" "}
        <Link href="./login" style={appStyle.links}>
          Login from here.
        </Link>
      </Text>

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
  }
});