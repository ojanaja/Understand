import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, TouchableHighlight, TouchableOpacity, Animated, ScrollView } from 'react-native'
import { getCourseList } from '../Services'
import SubHeading from './SubHeading';
import CourseItem from './HomeScreen/CourseItem';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../Utils/Colors';
import { GetAllUserProgressCourse } from '../Services';
import { useUser } from '@clerk/clerk-expo';

export default function CourseList({ level }) {

    const [CourseList, setCourseList] = useState([]);
    const navigation = useNavigation();
    const scrollX = new Animated.Value(0);
    let marginLeft = scrollX.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1],
    });

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = () => {
        getCourseList(level).then(resp => {
            // console.log("RESP--", resp);
            setCourseList(resp.courses)
        })
    }

    const [progressCourseList, setProgressCourseList] = useState();
    const { user } = useUser();

    useEffect(() => {
        user && GetAllUserProgressCourseList();
    }, [user]);

    const GetAllUserProgressCourseList = () => {
        GetAllUserProgressCourse(user.primaryEmailAddress.emailAddress).then(
            (resp) => {
                setProgressCourseList(resp.userEnrolledCourses);
            }
        );
    };

    return (
        <View>
            {progressCourseList?.length > 0 ? (
                <SubHeading text={level + ' Courses'} color={level == 'Basic' && COLORS.BLACK} />
            ) : (
                <SubHeading text={level + ' Courses'} color={level == 'Basic' && COLORS.PRIMARY} />
            )}
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
                scrollEventThrottle={16}
            >
                {CourseList.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => navigation.navigate('course-detail', { course: item })}
                    >
                        <CourseItem item={item} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View >
    )
}
