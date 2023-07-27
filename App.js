import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Amplify, Auth } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

import Welcome from './screen/Welcome';
import Login from './screen/Auth/Login';
import Signup from './screen/Auth/Signup'
import EmailVerification from './screen/Auth/Verification/EmailVerification';
import VerificationSuccess from './screen/Auth/Verification/VerificationSuccess';
import Dashboard from './screen/Dashboard';
import ForgotPw from './screen/Auth/Password/ForgotPw';
import Settings from './screen/Settings';
import PwReset from './screen/Auth/Password/PwReset';
import ResetPw from './screen/Auth/Password/ResetPw';

const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (e) {
        setUser(null);
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    checkAuthStatus();
  }, []);

  if (loading) {
    // Render a loading screen or component here
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Direct screen for authorized users
          <>
          <Stack.Screen name="Dashboard">
            {(props) => <Dashboard {...props} user={user} setUser={setUser} />}
          </Stack.Screen>
          {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </>

          
        ) : (
          <>
            <Stack.Screen name='Welcome' component={Welcome} />
            {/* <Stack.Screen name='Login' component={Login} /> */}
            <Stack.Screen name="Login">
              {(props) => <Login {...props} user={user} setUser={setUser}/>}
            </Stack.Screen>
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name="EmailVerification" component={EmailVerification} />
            <Stack.Screen name="VerificationSuccess" component={VerificationSuccess} />
            <Stack.Screen name='ForgotPw' component={ForgotPw} />
            <Stack.Screen name='PwReset' component={PwReset} />
            <Stack.Screen name='ResetPw' component={ResetPw} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});