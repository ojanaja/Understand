import { ScrollView, View, Text } from "react-native";
import React from "react";
import Header from "../components/HomeScreen/Header";
import COLORS from "../Utils/Colors";
import CourseList from "../components/CourseList";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={{
        backgroundColor: COLORS.GREEN, height: 250, padding: 20
      }} >
        <Header />
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ marginTop: -90 }}>
          <CourseList level={'Basic'} />
        </View>
        <CourseList level={'Advance'} />
        <CourseList level={'Moderate'} />
      </View>
    </ScrollView>
  );
}
