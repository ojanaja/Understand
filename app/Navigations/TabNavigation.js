import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../Screen/Profile";
import MyCourse from "../Screen/MyCourse";
import LeaderBoard from "../Screen/LeaderBoard";
import HomeScreen from "../Screen/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Ionicons name="home" size={size} color="black" />
            ) : (
              <Ionicons name="home-outline" size={size} color="black" />
            ),
          tabBarActiveTintColor: "black",
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderBoard}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Ionicons name="ios-stats-chart" size={24} color="black" />
            ) : (
              <Ionicons
                name="ios-stats-chart-outline"
                size={24}
                color="black"
              />
            ),
          tabBarActiveTintColor: "black",
        }}
      />
      <Tab.Screen
        name="My Course"
        component={MyCourse}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Ionicons name="ios-book-sharp" size={24} color="black" />
            ) : (
              <Ionicons name="ios-book-outline" size={24} color="black" />
            ),
          tabBarActiveTintColor: "black",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <FontAwesome5 name="user-alt" size={24} color="black" />
            ) : (
              <FontAwesome5 name="user" size={24} color="black" />
            ),
          tabBarActiveTintColor: "black",
        }}
      />
    </Tab.Navigator>
  );
}
