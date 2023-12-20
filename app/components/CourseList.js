import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, TouchableHighlight, TouchableOpacity, Animated } from 'react-native'
import { getCourseList } from '../Services'
import SubHeading from './SubHeading';
import CourseItem from './HomeScreen/CourseItem';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../Utils/Colors';

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
    return (
        <View>
            <SubHeading text={level + ' Courses'} color={level == 'Basic' && COLORS.PRIMARY} />
            <Animated.FlatList
                data={CourseList}
                key={CourseList.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('course-detail', {
                            course: item
                        })}>
                        <CourseItem item={item} />

                    </TouchableOpacity>

                )}
                style={{
                    marginLeft: marginLeft,
                    marginRight: -20,
                }}
            />
        </View >
    )
}
