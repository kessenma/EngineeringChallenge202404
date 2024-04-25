import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../components/LoginScreen";
import MachineStateScreen from "../app/tabs/MachineStateScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            {/*<Stack.Screen name="Entry" component={EntryScreen} />*/}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MachineState" component={MachineStateScreen} />

        </Stack.Navigator>
    );
}
