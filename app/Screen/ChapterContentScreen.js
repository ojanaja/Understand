import { ToastAndroid, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import Content from '../components/ChapterContent/Content';
import { MarkChapterCompleted } from '../Services';
import { useNavigation } from '@react-navigation/native';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';
import { UserPointsContext } from '../Context/UserPointsContext';
import { useUser } from '@clerk/clerk-expo';

export default function ChapterContentScreen() {
    const param = useRoute().params;
    const navigation = useNavigation();
    const { isChapterComplete, setIsChapterComplete } = useContext(CompleteChapterContext)
    const { userPoints } = useContext(UserPointsContext);
    const { user } = useUser();

    useEffect(() => {
        console.log('chapterId', param.chapterId);
        console.log('RecordId', param.userCourseRecordId);
    }, [param])

    const onChapterFinish = () => {
        console.log(user.primaryEmailAddress.emailAddress)
        const totalPoints = Number(userPoints) + param.content?.length * 10;
        MarkChapterCompleted(param.chapterId, param.userCourseRecordId, user.primaryEmailAddress.emailAddress, totalPoints).then(resp => {
            if (resp) {
                ToastAndroid.show('Congratss', ToastAndroid.LONG);
                setIsChapterComplete(true);
                navigation.goBack();
            }
        });
    }

    return param.content && (
        <View>
            <Content content={param.content}
                onChapterFinish={() => onChapterFinish()} />
        </View>
    );
}
