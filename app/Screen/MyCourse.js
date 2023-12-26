import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import COLORS from "../Utils/Colors";
import { GetAllUserProgressCourse } from "../Services";
import CourseProgressItem from "../components/MyCourse/CourseProgressItem";

export default function MyCourse() {
  const { user } = useUser();
  const navigation = useNavigation();
  const [progressCourseList, setProgressCourseList] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    user && GetAllUserProgressCourseList();
  }, [user]);

  const GetAllUserProgressCourseList = () => {
    setRefreshing(true); // Set refreshing to true when starting to fetch data
    GetAllUserProgressCourse(user.primaryEmailAddress.emailAddress)
      .then((resp) => {
        setProgressCourseList(resp.userEnrolledCourses);
      })
      .finally(() => {
        setRefreshing(false); // Set refreshing to false when data fetching is complete
      });
  };

  const onRefresh = () => {
    // This function will be triggered when the user pulls down to refresh
    GetAllUserProgressCourseList();
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <View style={{ height: 160, backgroundColor: COLORS.GREEN, padding: 30 }}>
          <Text style={{ fontFamily: 'bold', color: COLORS.PRIMARY, fontSize: 30 }}>My Course</Text>
        </View>
        {progressCourseList && progressCourseList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ margin: 8, padding: 5 }}
            onPress={() => navigation.navigate('course-detail', {
              course: item.course
            })}
          >
            <CourseProgressItem
              item={item.course}
              completedChapter={item?.completedChapter?.length}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
