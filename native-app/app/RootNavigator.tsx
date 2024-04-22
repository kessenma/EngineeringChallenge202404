import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntryScreen from '../components/EntryScreen';
import LoginScreen from "../components/LoginScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            {/*<Stack.Screen name="Entry" component={EntryScreen} />*/}
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}
