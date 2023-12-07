import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from "./app/Screen/LoginScreen";
// import LoginScreen from './app/Screen/LoginScreen';




export default function App() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'light': require('./assets/fonts/Outfit-Light.ttf'),
    'semi': require('./assets/fonts/Outfit-SemiBold.ttf'),
  });

  return (
    <ClerkProvider publishableKey={Constants.expoConfig.extra.clerkPublishableKey}>
      <View style={styles.container}>

        <SignedIn>
          <Text>You are Signed in</Text>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
