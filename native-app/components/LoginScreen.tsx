import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // toggle between login and signup

    const handleAuth = async () => {
        const url = `http://localhost:3001/${isLogin ? 'login' : 'signup'}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include', // if your server uses cookies
            });

            if (response.ok) {
                const json = await response.json();
                // Handle successful authentication
                navigation.navigate('MachineState');
            } else {
                const errorJson = await response.json();
                Alert.alert('Authentication Failed', errorJson.message || 'Please check your credentials.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Network error', error.message || 'Unable to connect to the server');
        }
    };


    return (
        <View style={styles.container}>
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
            <Button title={isLogin ? "Log In" : "Sign Up"} onPress={handleAuth} />
            <Button
                title={isLogin ? "Need an account? Sign Up" : "Have an account? Log In"}
                onPress={() => setIsLogin(!isLogin)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoginScreen;
