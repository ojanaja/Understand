import { View, Text, index } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import COLORS from '../../Utils/Colors';

export default function ChapterSection({ chapterList }) {
    return (
        <View>
            {chapterList.map((item, index) => (
                <View key={index} style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                    padding: 15, borderWidth: 1, borderRadius: 10, marginTop: 10,
                    borderColor: COLORS.GREEN
                }}>
                    <View style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10
                    }}>
                        <Text style={{ fontFamily: 'bold', fontSize: 27, color: COLORS.GRAY }}>{index + 1}</Text>
                        <Text style={{ fontFamily: 'poppins', fontSize: 21, color: COLORS.GRAY }}>{item.title}</Text>
                    </View>
                    <FontAwesome name="lock" size={25} color={COLORS.ERROR} />
                </View>
            ))}
        </View>
    )
}
