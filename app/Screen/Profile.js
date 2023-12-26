import React, { useContext } from 'react'
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { ClerkProvider, useClerk, useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../Utils/Colors";
import coin from '../../assets/images/coin.png'
import { UserPointsContext } from "../Context/UserPointsContext";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export default function HomeScreen() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const { userPoints } = useContext(UserPointsContext);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.PRIMARY, height: '100%' }}
    >
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <View style={{
          display: "flex",
          alignItems: "center",
          top: 20,
          paddingVertical: 30,
          backgroundColor: COLORS.GREEN,
          borderRadius: 20,
          width: '90%'
        }}>
          <Image source={{ uri: user?.imageUrl }}
            style={{ width: 100, height: 100, borderRadius: 50 }} />
          <Text style={{
            marginTop: 10,
            fontSize: 20,
            fontFamily: 'semi',
            color: COLORS.PRIMARY
          }}>{user.fullName}</Text>

          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                marginTop: 10
              }}>
              <Image source={coin} style={{ width: 25, height: 25 }} />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'semi',
                  color: COLORS.PRIMARY
                }}>{userPoints}</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginLeft: 20,
        }}>
        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            width: '95%',
            height: 50,
            backgroundColor: COLORS.SECONDARY,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            flexDirection: 'row',
            elevation: 5,
            padding: 10,
            marginTop: 50
          }}>
          <MaterialIcons name="logout" size={22} color="grey" />
          <Text
            style={{
              fontFamily: 'poppins',
              color: COLORS.ERROR
            }}
          >Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
}
