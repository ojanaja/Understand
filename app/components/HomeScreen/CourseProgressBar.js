import { View, Text } from 'react-native'
import React from 'react'
import COLORS from '../../Utils/Colors'

export default function CourseProgressBar({ totalChapter, completedChapter }) {
    const width = (completedChapter / totalChapter) * 100 + "%"

    return (
        <View style={{
            width: '100%',
            height: 7,
            backgroundColor: COLORS.GRAY,
            borderRadius: 99
        }}>
            <View style={{
                width: width,
                height: 7,
                backgroundColor: COLORS.GREEN,
                borderRadius: 99
            }}>

            </View>

        </View>
    )
}