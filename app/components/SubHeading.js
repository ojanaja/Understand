import { View, Text } from 'react-native'
import React from 'react'
import COLORS from '../Utils/Colors'

export default function SubHeading({ text, color = COLORS.BLACK
}) {
    return (
        <View>
            <Text style={{
                fontFamily: 'bold',
                fontSize: 24,
                color: color
            }} >{text}</Text>
        </View>
    )
}