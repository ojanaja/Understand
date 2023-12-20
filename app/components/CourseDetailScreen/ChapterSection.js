import { View, Text, index, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Utils/Colors';
import { CompleteChapterContext } from '../../Context/CompleteChapterContext';

export default function ChapterSection({ chapterList, userEnrolledCourse }) {

    const { isChapterComplete, setIsChapterComplete } = useContext(CompleteChapterContext)
    const navigation = useNavigation();
    // console.log(userEnrolledCourse[0].completedChapter)
    const OnChapterPress = (chapter) => {

        if (userEnrolledCourse?.length == 0) {
            ToastAndroid.show('Please Enroll Course!', ToastAndroid.LONG)
            return;
        }
        else {
            setIsChapterComplete(false);
            navigation.navigate('chapter-content', {
                content: chapter.content,
                chapterId: chapter.id,
                userCourseRecordId: userEnrolledCourse[0]?.id
            })
        }
    };

    const checkIsChapterCompleted = (chapterId) => {
        if (!userEnrolledCourse || !userEnrolledCourse[0] || !userEnrolledCourse[0].completedChapter) {
            return false;
        }
        const resp = userEnrolledCourse[0].completedChapter.find(item => item.chapterId == chapterId)
        return resp;
    }

    return chapterList && (
        <View style={{
            padding: 10,
            backgroundColor: COLORS.PRIMARY,
            marginTop: 20,
            borderRadius: 15
        }}>

            <Text style={{
                fontFamily: 'bold', fontSize: 20
            }}>Chapters</Text>
            {chapterList.map((item, index) => (
                console.log(index),
                <TouchableOpacity key={index}
                    style={[checkIsChapterCompleted(item.id)

                        ? styles.CompleteChapter
                        : styles.inCompleteChapter]}
                    onPress={() => OnChapterPress(item)}>
                    <View style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10,
                    }}>
                        {checkIsChapterCompleted(item.id) ?
                            <AntDesign name="checkcircle" size={28} color={COLORS.GREEN} />
                            : <Text style={{ fontFamily: 'semi', fontSize: 15, color: COLORS.GRAY }}>{index + 1}</Text>}
                        <Text style={{ fontFamily: 'poppins', fontSize: 15, color: COLORS.GRAY }}>{item.title}</Text>
                    </View>
                    {userEnrolledCourse?.length == 0 ?
                        <FontAwesome name="lock" size={20} color={COLORS.GRAY} />
                        :
                        <FontAwesome name="play" size={20} color={checkIsChapterCompleted(item.id) ? COLORS.GREEN : COLORS.GRAY} />
                    }
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    inCompleteChapter: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        padding: 10, borderWidth: 1, borderRadius: 10, marginTop: 10,
        borderColor: COLORS.GRAY, height: 50
    },
    CompleteChapter: {
        backgroundColor: COLORS.PRIMARY,
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        padding: 10, borderWidth: 1, borderRadius: 10, marginTop: 10,
        borderColor: COLORS.GREEN, height: 50
    }
})
