import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import Header from "../components/HomeScreen/Header";
import COLORS from "../Utils/Colors";
import CourseList from "../components/CourseList";
import { createNewUser, getUserDetail } from "../Services";
import { UserPointsContext } from "../Context/UserPointsContext";
import { useUser } from '@clerk/clerk-expo';
import CourseProgress from "../components/HomeScreen/CourseProgress";

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
    await createNewUser(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl);
    getUserDetails();
  };

  const getUserDetails = async () => {
    const resp = await getUserDetail(user.primaryEmailAddress.emailAddress);
    console.log("--", resp.userDetail?.point);
    setUserPoints(resp.userDetail?.point);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
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
        <Header userPoints={userPoints} />
      </View>


      <View style={{ padding: 20 }}>
        <View style={{ marginTop: -90 }}>
          <CourseProgress />
          <CourseList level={'Basic'} />
        </View>
        <View>
          <CourseList level={'Moderate'} />
          <CourseList level={'Advance'} />
        </View>
      </View>
    </ScrollView>
  );
}
