import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import SubHeading from '../SubHeading';
import { GetAllUserProgressCourse } from '../../Services';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Utils/Colors';
import CourseItem from './CourseItem';

export default function CourseProgress() {
    const { user } = useUser();
    const navigation = useNavigation();
    const [progressCourseList, setProgressCourseList] = useState();
    const scrollX = new Animated.Value(0);
    let marginLeft = scrollX.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1],
    });

    useEffect(() => {
        user && GetAllUserProgressCourseList();
    }, [user]);

    const GetAllUserProgressCourseList = () => {
        GetAllUserProgressCourse(user.primaryEmailAddress.emailAddress).then(
            (resp) => {
                const incompleteCourses = resp.userEnrolledCourses.filter(
                    (item) => !item.completedChapter || item.completedChapter.length === 0
                );

                setProgressCourseList(incompleteCourses);
            }
        );
    };

    return (
        <View>
            {progressCourseList?.length > 0 ? (
                <SubHeading text={' In Progress'} color={COLORS.PRIMARY} />
            ) : null}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                style={{
                    marginLeft: marginLeft,
                    marginRight: -20,
                    marginBottom: 20
                }}
            >
                {progressCourseList?.map((item) => (
                    <TouchableOpacity
                        key={item.course.id}
                        onPress={() =>
                            navigation.navigate('course-detail', {
                                course: item.course,
                            })
                        }
                    >
                        <CourseItem
                            item={item.course}
                            completedChapter={item?.completedChapter?.length}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
