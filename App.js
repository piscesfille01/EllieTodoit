import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Amplify, Auth } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

import Welcome from "./screens/Welcome";
import Dashboard from "./screens/Dashboard";

const Stack = createNativeStackNavigator();

export default function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(null);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUserLoggedIn(currentUser);
      } catch (error) {
        setUserLoggedIn(null);
        console.log(error);
      }
    }
    checkAuthStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
      {userLoggedIn ? (

          <>
            <Stack.Screen name='Dashboard' component={ Dashboard } />
          </>

          
        ) : (

          <>
            <Stack.Screen name='Welcome' component={ Welcome } />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

