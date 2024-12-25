import { View, StyleSheet} from "react-native";

export default function GroupDetails() {
    return(
        <View style = {appStyle.screen}>

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