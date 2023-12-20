import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import Header from "../components/HomeScreen/Header";
import COLORS from "../Utils/Colors";
import CourseList from "../components/CourseList";
import { createNewUser, getUserDetail } from "../Services";
import { UserPointsContext } from "../Context/UserPointsContext";
import { useUser } from '@clerk/clerk-expo';

export default function HomeScreen() {
  const { user } = useUser();
  const { userPoints, setUserPoints } = useContext(UserPointsContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      createNewUserIfNeeded();
    }
  }, [user]);

  const createNewUserIfNeeded = async () => {
    await createNewUser(user.fullName, user.primaryEmailAddress.emailAddress);
    getUserDetails();
  };

  const getUserDetails = async () => {
    const resp = await getUserDetail(user.primaryEmailAddress.emailAddress);
    console.log("--", resp.userDetail?.point);
    setUserPoints(resp.userDetail?.point);
    setRefreshing(false); // Stop the refreshing indicator
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Perform any actions you want to do on refresh
    getUserDetails();
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={{
        backgroundColor: COLORS.GREEN, height: 250, padding: 20
      }} >
        <Header />
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ marginTop: -90 }}>
          <CourseList level={'Basic'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <CourseList level={'Moderate'} />
          <CourseList level={'Advance'} />
        </View>
      </View>
    </ScrollView>
  );
}
