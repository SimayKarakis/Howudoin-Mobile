import {Text, TextInput, Image, StyleSheet, Pressable, View , Alert} from "react-native";
import {useState} from "react";
import {Link, useRouter} from "expo-router";

export default function Index() 
{
  const router = useRouter();
  
  const [userName, setName] = useState("");
  const [userLastName, setLastName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");

  interface RegisterResponse {
    name: string;
    lastName: string;
    email: string;
    password: string;
  }

  function submit()
  {
    function afterResponse(result: RegisterResponse)
    {
      Alert.alert("User " + result.name + " is registered!")
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

    fetch("http://localhost:8080/register", requestOptions)
      .then((response) => response.json() as Promise<RegisterResponse>)
      .then((result) => afterResponse(result))
      .catch((error) => console.error(error))

  }

  return (
    <View style={appStyle.screen}>

      <Image source={require('../assets/images/logo.png')} style = {appStyle.images}/>
      
      <TextInput 
        onChangeText={(a)=>setName(a)} 
        style = {appStyle.textBoxes} 
        placeholder="name">
      </TextInput>

      <TextInput 
        onChangeText={(a)=>setLastName(a)} 
        style = {appStyle.textBoxes} 
        placeholder="last name">  
      </TextInput>

      <TextInput 
        onChangeText={(a)=>setEmail(a)} 
        style = {appStyle.textBoxes} 
        placeholder="email">
      </TextInput>

      <TextInput 
        onChangeText={(a)=>setPassword(a)} 
        style = {appStyle.textBoxes} 
        placeholder="password">
      </TextInput>

      <View style={appStyle.buttons}>
        <Pressable onPress={submit}>
            <Text>REGISTER</Text>
        </Pressable>
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