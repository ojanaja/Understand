import { useOAuth } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import Colors from "../Utils/Colors";
import google from "./../../assets/images/googleU.png";
import app from "./../../assets/images/logoU.png";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
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

  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Image
        source={app}
        style={{
          width: 200,
          height: 250,
          objectFit: "contain",
          marginTop: 50,
          marginBottom: 100,
        }}
      />

      <LinearGradient
        colors={["transparent", Colors.PRIMARY]}
        style={{ width: "100%", height: 600, margin: -60 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 35,
            color: Colors.WHITE,
            fontFamily: "bold",
            marginTop: 150,
          }}
        >
          Join us today
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginBottom: 100,
            color: Colors.LIGHT_PRIMARY,
            fontFamily: "outfit",
          }}
        >
          Empower Learn, Grasp Knowledge
        </Text>

        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: Colors.WHITE,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "center",
            padding: 5,
            width: 300,
            height: 40,
            borderRadius: 100,
            marginTop: 20,
            marginLeft: 55,
          }}
        >
          <Image source={google} style={{ width: 30, height: 30 }} />
          <Text
            style={{
              fontSize: 20,
              color: Colors.PRIMARY,
              fontFamily: "outfit",
            }}
          >
            Sign In With Google
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
