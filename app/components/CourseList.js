import { View, Text, FlatList, Image, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCourseList } from '../Services'
import SubHeading from './SubHeading';
import CourseItem from './HomeScreen/CourseItem';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../Utils/Colors';

export default function CourseList({ level }) {

    const [CourseList, setCourseList] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = () => {
        getCourseList(level).then(resp => {
            console.log("RESP--", resp);
            setCourseList(resp.courses)
        })
    }
    return (
        <View>
            <SubHeading text={level + ' Courses'} color={level == 'Basic' && COLORS.PRIMARY} />
            <FlatList
                data={CourseList}
                key={CourseList.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('course-detail', {
                            course: item
                        })}>
                        <CourseItem item={item} />

                    </TouchableOpacity>

                )}
            />
        </View >
    )
}