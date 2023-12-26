import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./app/Screen/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./app/Navigations/TabNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./app/Screen/WelcomeScreen";
import SignUpScreen from "./app/Screen/SignUpScreen";
import CodeVerificationScreen from "./app/Screen/CodeVerificationScreen";
import { CompleteChapterContext } from "./app/Context/CompleteChapterContext";
import { useState } from "react";
import { UserPointsContext } from "./app/Context/UserPointsContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isChapterComplete, setIsChapterComplete] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  const [fontsLoaded] = useFonts({
    poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    semi: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const tokenCache = {
    async getToken(key) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  return (
    <ClerkProvider
      publishableKey={"pk_test_cmVsZXZhbnQtaGFkZG9jay01MS5jbGVyay5hY2NvdW50cy5kZXYk"}
      tokenCache={tokenCache}
    >
      <UserPointsContext.Provider value={{ userPoints, setUserPoints }}>
        <CompleteChapterContext.Provider value={{ isChapterComplete, setIsChapterComplete }}>
          <SignedIn>
            <NavigationContainer>
              <TabNavigation />
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Welcome"
                  component={WelcomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Signup"
                  component={SignUpScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CodeVerification"
                  component={CodeVerificationScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SignedOut>
        </CompleteChapterContext.Provider>
      </UserPointsContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
