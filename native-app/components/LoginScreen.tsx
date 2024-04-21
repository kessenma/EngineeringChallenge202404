import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const json = await response.json();

            if (response.ok) {
                // If login is successful, navigate to the next screen or save token
                // e.g., navigation.navigate('Home');
            } else {
                // If there was a problem, alert the user
                Alert.alert('Login Failed', json.message || 'Please check your credentials.');
            }
        } catch (error) {
            // If there is an error sending the request
            Alert.alert('Network error', 'Unable to connect to the server');
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Log In" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
