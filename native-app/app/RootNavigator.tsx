import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import LoginScreen from '../../native-app/components/LoginScreen'; // Adjust the import path as necessary
import TabLayout from './(tabs)/_layout'; // Adjust the import path as necessary
// If you use a global state or context, import that to check if the user is logged in.

export default function RootNavigator() {
    // Assuming 'userIsLoggedIn' would be derived from your authentication state:
    // const userIsLoggedIn = ...; // Retrieve this from your auth state or context.
    // For demonstration purposes, we'll just use a useState hook.
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    // Let's say you have some side effect or context listener that updates `userIsLoggedIn`.
    useEffect(() => {
        // Your logic to check if the user is logged in.
        // This could be a token check or a call to AsyncStorage, for example.
        // setUserIsLoggedIn(true or false based on the result);
    }, []);

    return (
        <Stack.Navigator initialRouteName={userIsLoggedIn ? 'Main' : 'Login'}>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={TabLayout} options={{ headerShown: false }} />
            {/* Other screens can be added here as needed */}
        </Stack.Navigator>
    );
}
