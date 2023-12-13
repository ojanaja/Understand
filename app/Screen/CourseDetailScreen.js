import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import DetailSection from '../components/CourseDetailScreen/DetailSection';
import ChapterSection from '../components/CourseDetailScreen/ChapterSection';

export default function CourseDetailScreen() {
    const navigate = useNavigation();
    const params = useRoute().params;
    useEffect(() => {
        console.log(params.course);
    }, [params.course])
    return params.course && (
        <ScrollView style={{ padding: 20 }}>
            <TouchableOpacity onPress={() => navigate.goBack()}>
                <Ionicons name="ios-arrow-back-circle" size={40} color="black" />
            </TouchableOpacity>
            <DetailSection course={params.course} />
            <ChapterSection chapterList={params.course.chapters} />
        </ScrollView>
    )
}