import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useSignIn } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const onSignInPress = async () => {
    setEmailError("");
    setPasswordError("");

    if (!emailAddress && !password) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      return;
    }

    if (!emailAddress) {
      setEmailError("Email is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.PRIMARY,
        height: '100%',
      }}
    >
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            marginTop: 100,
            fontFamily: 'bold',
            fontSize: 25,
            textAlign: 'center',
            color: COLORS.BLACK,
          }}
        >Login here</Text>
        <Text
          style={{
            fontFamily: 'semi',
            fontSize: 15,
            marginBottom: 50,
            color: COLORS.BLACK,
            textAlign: 'center',
          }}
        >Welcome Back! you've been missed.</Text>
      </View>
      <View>
        <TextInput
          value={emailAddress}
          autoCapitalize='none'
          placeholder='Email'
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          style={{
            fontFamily: 'poppins',
            marginHorizontal: 15,
            padding: 15,
            borderRadius: 10,
            backgroundColor: COLORS.SECONDARY,
            marginVertical: 10,
            borderColor: emailError ? COLORS.BLACK : COLORS.SECONDARY,
            borderWidth: emailError ? 1 : 0,
          }}
        />
        {emailError ? (
          <Text style={{ color: COLORS.ERROR, marginHorizontal: 20, fontFamily: 'poppins', fontSize: 12 }}>{emailError}</Text>
        ) : null}
        <TextInput
          value={password}
          placeholder='Password'
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          style={{
            fontFamily: 'poppins',
            marginHorizontal: 15,
            padding: 15,
            borderRadius: 10,
            backgroundColor: COLORS.SECONDARY,
            marginVertical: 10,
            borderColor: passwordError ? COLORS.BLACK : COLORS.SECONDARY,
            borderWidth: passwordError ? 1 : 0,
          }}
        />
        {passwordError ? (
          <Text style={{ color: COLORS.ERROR, marginHorizontal: 20, fontFamily: 'poppins', fontSize: 12 }}>{passwordError}</Text>
        ) : null}
      </View>
      <View>
        <Text
          style={{
            marginTop: 20,
            marginHorizontal: 15,
            textAlign: 'right',
            fontFamily: 'semi',
            color: COLORS.BLACK
          }}
        >
          Forgot your password?
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 50,
          marginHorizontal: 15,

        }}
      >
        <TouchableOpacity
          onPress={onSignInPress}
          style={{
            backgroundColor: COLORS.BLACK,
            width: '100%',
            height: 45,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: COLORS.BLACK,
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: COLORS.PRIMARY,
              fontFamily: 'semi'
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={{
            marginVertical: 30
          }}
        >
          <Text
            style={{
              fontFamily: 'semi',
              fontSize: 14
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'semi'
          }}
        >
          Or continue with
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 30,
          marginVertical: 25
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: COLORS.SECONDARY,
            width: '90%',
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            shadowColor: COLORS.BLACK,
            elevation: 5,
            display: 'flex',
            flexDirection: 'row',
            gap: 10
          }}
        >
          <Ionicons name="ios-logo-google" size={24} color="black" />
          <Text
            style={{
              fontFamily: 'semi'
            }}
          >
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen;
