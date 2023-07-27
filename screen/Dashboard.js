import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { API, graphqlOperation } from "aws-amplify";

export default function Dashboard({ user, setUser }) {
  const navigation = useNavigation();

  const [greetings, setGreetings] = useState(null);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreetings("Good morning, ");
    } else if (currentHour < 18) {
      setGreetings("Good afternoon, ");
    } else {
      setGreetings("Good evening, ");
    }

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
      {user && (
        <>
          {/* <TouchableOpacity 
            style={css.profilePic}>
            onPress={()=>{navigation.navigate('Settings')}}
          </TouchableOpacity> */}
          {/* <Button onPress={signOut}>Sign Out</Button> */}
          {/* <Text style={css.emoji}>📣</Text>
          <Text style={css.greetingTxt}>{greetings}{user.attributes.given_name}</Text> */}
          <Text style={css.header}>Today's Tasks</Text>
          {/* <TaskType /> */}
        </>
      )}

      {user && (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddTodo")}
          style={css.floatingBtnContainer}
        >
          <Text style={css.floatingBtnTxt}>+</Text>
        </TouchableOpacity>
        /* <FAB
            style={css.floatingBtnContainer}>
              <Text style={css.floatingBtnTxt}>+</Text>
          </FAB> */
      )}
    </View>
  );
}

// Rest of the code remains the same

const css = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 80,
    position: 'relative',
  },
  profilePic: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    // position: 'absolute',
    backgroundColor: "#d3d3d3",
    borderRadius: 100,
  },
  greetingTxt: {
    marginTop: 10,
    fontSize: 13,
    color: "black",
  },
  emoji: {
    fontSize: 43,
  },
  header: {
    marginTop: 15,
    fontSize: 45,
    fontWeight: "400",
  },
  taskType: {
    marginTop: 20,
  },
  floatingBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderWidth: 1,
    borderColor: "#EB7A53",
    width: 70,
    height: 70,
    backgroundColor: "#EB7A53",
    borderRadius: 100,
    shadowColor: "#171717",
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    right: '12%',
    bottom: '12%',
  },
  floatingBtnTxt: {
    color: "white",
    fontSize: 35,
    fontWeight: "200",
  },
});
