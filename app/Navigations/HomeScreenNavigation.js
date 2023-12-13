import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CourseDetailScreen from '../Screen/CourseDetailScreen';
import HomeScreen from '../Screen/HomeScreen';


const Stack = createStackNavigator();
export default function HomeScreenNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='course-detail' component={CourseDetailScreen} />
        </Stack.Navigator>
    )
}