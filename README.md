# Documentation for ChatGPT

## Overview

This documentation provides an in-depth explanation of the ChatGPT-Gemini application. The primary objective of this application is to function like ChatGPT, allowing users to input queries and receive AI-generated responses. Additionally, the app features a secure authentication system implemented using Firebase Authentication to manage user registration and login.

The application uses React Context API to efficiently manage authentication states and data throughout the entire application, ensuring a seamless and consistent user experience. Firestore is used for persistent storage of chat data and user-related information.

## Navigation System

The application follows a structured navigation system that directs users between different screens, including login, registration, and the main chat interface. This ensures a smooth user experience and proper handling of authentication states.

### Code Fragment:
```tsx
import { DataContextProvider } from "@/context/dataContext/DataContext";
import { AuthProvider } from "@/context/dataContext/AuthContext";
import { Stack } from "expo-router";
import { RootStackParamList } from "@/app/types";

export default function RootLayout() {
  return (
    <AuthProvider>
      <DataContextProvider>
        <Stack 
          screenOptions={{ headerShown: false }} 
          initialRouteName="welcome"
        >
          <Stack.Screen name="Home" options={{ title: "Home" }} />
          <Stack.Screen name="capabilities" options={{ title: "Capabilities" }} />
          <Stack.Screen name="emptyConversation" options={{ title: "Empty Conversation" }} />
          <Stack.Screen name="examples" options={{ title: "Examples" }} />
          <Stack.Screen name="index" options={{ title: "Index" }} />
          <Stack.Screen name="limitations" options={{ title: "Limitations" }} />
          <Stack.Screen name="authentication" options={{ title: "Authentication" }} />
          <Stack.Screen name="welcome" options={{ title: "Welcome" }} />
          <Stack.Screen name="dashboard" options={{ title: "Dashboard", headerShown: false }} />
          <Stack.Screen name="register" options={{ title: "Register" }} />
        </Stack>
      </DataContextProvider>
    </AuthProvider>
  );
}
```
Stack Navigation: The createNativeStackNavigator function creates a stack-based navigation system.

Screen Components: The Stack.Screen elements define the different screens available in the app.

Authentication Flow: The user starts at the login screen and can navigate to the registration or chat screen based on authentication status.

## Context Management

To handle global states efficiently, the application utilizes React Context API. The AuthContext manages user authentication, while the DataContext manages application-wide data, ensuring consistency across different components.

AuthContext: Handles user authentication, login status, and Firebase Authentication functions.

DataContext: Manages chat data, user preferences, and other state-dependent functionalities.

## User Registration and Login

The application employs Firebase Authentication for managing user credentials securely. It provides functions to register new users and authenticate existing ones.

### Registration Function:
```tsx
iconst signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirige tras login exitoso
      return true;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return false;
    }
  };
```
Firebase Authentication Instance: getAuth() initializes the authentication service.

User Registration: createUserWithEmailAndPassword registers a new user using an email and password.

Error Handling: If registration fails, an error message is logged to the console.

## Login Function:

```tsx
const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); //  Redirige tras registro exitoso
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };
```

Authentication Flow: The function attempts to sign in a user with email and password.

Error Handling: If login fails, an appropriate error message is displayed.

Successful Authentication: If successful, the user’s details are logged.

## Chat Functionality

The main feature of the application is the chat interface, where users input queries, and the AI responds. This is achieved by integrating an AI model, such as Google’s Gemini API, into the system.

### Chat Handling Function:

```tsx
const sendMessage = async (text: string, id: string) => {
        if (!text.trim()) return;

        const newMessage: MessageWithKey = {
            idts: Date.now().toString(),
            text,
            sender: "user",
            fecha: new Date().toISOString(),
            emisor: "Usuario",
            message: text,
            key: Date.now().toString(),
        };

        setIsLoading(true);
        setMessages((prev) => [...prev, newMessage]);

        try {
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCFPEdbkbO_90iTylK8KrsOtQzKSVCxiNE", {
                method: "POST",
                body: JSON.stringify({ contents: [{ parts: [{ text }] }] }),
            });

            const data: APIResponse = await response.json();
            const aiMessage: MessageWithKey = {
                idts: Date.now().toString(),
                text: data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
                sender: "bot",
                fecha: new Date().toISOString(),
                emisor: "AI",
                message: data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
                key: Date.now().toString(),
            };

            setMessages((prev) => [...prev, aiMessage]);

            const docRef = doc(db, "conversations", id);
            await updateDoc(docRef, {
                messages: arrayUnion(newMessage, aiMessage),
            });
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };
```

## Firebase Configuration

To integrate Firebase, the app requires a configuration setup that initializes Firebase services.

### Firebase Initialization:

```tsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADdgx0PavamAMtMKc0SklP9rN0p3IPNiY",
  authDomain: "dam-chat-2025l.firebaseapp.com",
  projectId: "dam-chat-2025l",
  storageBucket: "dam-chat-2025l.firebasestorage.app",
  messagingSenderId: "1006263670339",
  appId: "1:1006263670339:web:a8a10435fadec9be6e66f6",
  measurementId: "G-DSK79TXS3Y"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
```
## Conclusion

This documentation covers the key aspects of the ChatGPT-Gemini application. Firestore is used for data persistence, ensuring that chat conversations and user information are stored securely. Future enhancements may include user profile management, multi-factor authentication, and support for additional AI models.
