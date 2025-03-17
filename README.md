# Documentation for ChatGPT

## Overview

This documentation provides an in-depth explanation of the ChatGPT-Gemini application. The primary objective of this application is to function like ChatGPT, allowing users to input queries and receive AI-generated responses. Additionally, the app features a secure authentication system implemented using Firebase Authentication to manage user registration and login.

## Navigation System

The application follows a structured navigation system that directs users between different screens, including login, registration, and the main chat interface. This ensures a smooth user experience and proper handling of authentication states.

## Code Fragment:
'''tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
'''
