import {Tabs} from "expo-router";
import Feather from '@expo/vector-icons/Feather';

export default function RootLayout() {
    return (
      <Tabs>
        <Tabs.Screen
          name="chats"
          options={{
            title: 'Chats',
            tabBarIcon: () => <Feather name="message-circle" size={24} color="black" />,
          }}
        />

        <Tabs.Screen
          name="groups"
          options={{
            title: 'Groups',
            tabBarIcon: () => <Feather name="users" size={24} color="black" />, // change colorrr 
          }}
        />

        <Tabs.Screen
          name="incoming"
          options={{
            title: 'Incoming Friend Requests',
            tabBarIcon: () => <Feather name="user-check" size={24} color="black" />,
          }}
        />
      </Tabs>
    );
  }