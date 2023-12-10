import React from "react";
import { View, Text, Button } from "react-native";
import { ClerkProvider, useClerk } from "@clerk/clerk-expo";

export default function HomeScreen() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
