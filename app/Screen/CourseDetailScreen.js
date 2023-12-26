import { View, Text, TouchableOpacity, ScrollView, ToastAndroid, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DetailSection from '../components/CourseDetailScreen/DetailSection';
import ChapterSection from '../components/CourseDetailScreen/ChapterSection';
import { enrollCourse, getUserEnrolledCourse } from '../Services';
import { useUser } from '@clerk/clerk-expo';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';

export default function CourseDetailScreen() {
    const navigate = useNavigation();
    const params = useRoute().params;
    const { isChapterComplete, setIsChapterComplete } = useContext(CompleteChapterContext);
    const [userEnrolledCourse, setUserEnrolledCourse] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        console.log(params.course);
        if (user && params.course) {
            GetUserEnrolledCourse();
        }
    }, [params.course, user]);

    useEffect(() => {
        isChapterComplete && GetUserEnrolledCourse();
    }, [isChapterComplete]);

    const onRefresh = () => {
        setRefreshing(true);
        GetUserEnrolledCourse();
        setRefreshing(false);
    };

    const UserEnrollCourse = () => {
        enrollCourse(params.course.id, user.primaryEmailAddress.emailAddress)
            .then((resp) => {
                // console.log("--", resp);
                if (resp) {
                    ToastAndroid.show('Course Enrolled successfully!', ToastAndroid.LONG);
                    GetUserEnrolledCourse();
                }
            });
    };

    const GetUserEnrolledCourse = () => {
        getUserEnrolledCourse(params.course.id, user.primaryEmailAddress.emailAddress)
            .then((resp) => {
                // console.log("--", resp.userEnrolledCourses);
                setUserEnrolledCourse(resp.userEnrolledCourses);
            });
    };

    return params.course && (
        <ScrollView
            style={{ padding: 20 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <TouchableOpacity style={{ marginVertical: 20 }} onPress={() => navigate.goBack()}>
                <Ionicons name="ios-arrow-back-circle" size={40} color="black" />
            </TouchableOpacity>
            <DetailSection
                course={params.course}
                userEnrolledCourse={userEnrolledCourse}
                enrollCourse={() => UserEnrollCourse()}
            />
            <ChapterSection chapterList={params.course.chapters} userEnrolledCourse={userEnrolledCourse} />
        </ScrollView>
    );
}
