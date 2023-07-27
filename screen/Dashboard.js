// import { useNavigation } from "@react-navigation/native";
// import { Auth } from "aws-amplify";
// import React, { useEffect, useState } from "react";
// import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// import { API, graphqlOperation } from "aws-amplify";

// export default function Dashboard({ user, setUser }) {
//   const navigation = useNavigation();

//   const [greetings, setGreetings] = useState(null);

//   useEffect(() => {
//     const currentHour = new Date().getHours();

//     if (currentHour < 12) {
//       setGreetings("Good morning, ");
//     } else if (currentHour < 18) {
//       setGreetings("Good afternoon, ");
//     } else {
//       setGreetings("Good evening, ");
//     }

//     async function getCurrentUser() {
//       try {
//         const currentUser = await Auth.currentAuthenticatedUser();
//         setUser(currentUser);
//       } catch (error) {
//         console.log("Error retrieving current user", error);
//       }
//     }
//     getCurrentUser();
//   }, []);

//   async function signOut() {
//     try {
//       setUser(null);
//       await Auth.signOut();
//       console.log("User sign out successful!");
//       navigation.navigate("Welcome");
//     } catch (e) {
//       console.log("Error signing out:", e);
//     }
//   }

//   return (
//     <View style={css.container}>
//       <Text> Welcome, {user} </Text>
//     </View>
//   );
// }

// // Rest of the code remains the same

// const css = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 30,
//     paddingVertical: 80,
//     position: 'relative',
//   },
// });


import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import React, { useEffect, useState,useRef } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../src/graphql/mutations";
import { listTodos } from "../src/graphql/queries";
import { onCreateTodo } from "../src/graphql/subscriptions";

import Calendar from "../component/Calendar";

export default function Dashboard({ user, setUser }) {
  const navigation = useNavigation();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);


  useEffect(() => {
  
    async function getCurrentUser() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (error) {
        console.log("Error retrieving current user", error);
      }
    }
    getCurrentUser();
  }, []);

  async function signOut() {
    try {
      setUser(null);
      await Auth.signOut();
      console.log("User sign out successful!");
      navigation.navigate("Welcome");
    } catch (e) {
      console.log("Error signing out:", e);
    }
  }

  return (
    <View style={css.container}>
        <Text style={css.welcomeTxt}>Welcome, {user.attributes.given_name}</Text>
        

      <TouchableOpacity onPress={(date) => {console.log("Selected Date: ", date)}}>
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate}  />
      </TouchableOpacity>
      
      <View style={css.todoContainer}>

      </View>
      

      {/* <TouchableOpacity style={css.signOutButton} onPress={signOut}>
          <Text>Sign Out</Text>
        </TouchableOpacity> */}
      
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 80,
    position: "relative",
    
  },
  welcomeTxt: {
    fontSize: 25,
    fontWeight: '600',
  },
  todoContainer: {
    flex: 1,
    // paddingHorizontal: 25,
    height: '100%',
    borderWidth: 2,
    backgroundColor:"#eee",
    borderColor: 'black',
    borderRadius: 30
  }
});
