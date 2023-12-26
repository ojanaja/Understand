import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import CourseProgressBar from '../HomeScreen/CourseProgressBar';


export default function CourseProgressItem({ item, completedChapter }) {
    return (
        <View style={{
            padding: 10, backgroundColor: COLORS.PRIMARY,
            marginRight: 15, borderRadius: 15,
        }} >
            <Image source={{ uri: item?.banner?.url }}
                style={{ width: "100%", height: 170, borderRadius: 15 }} />
            <View style={{ padding: 7 }}>
                <Text style={{
                    fontFamily: 'bold',
                    fontSize: 16,
                }}>{item.name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center', gap: 5, marginTop: 3
                    }}>
                        <Ionicons name="book-outline" size={18} color="black" />
                        <Text style={{ fontFamily: 'poppins' }}>{item?.chapters?.length} Chapters</Text>
                    </View>
                    <View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center', gap: 5, marginTop: 3
                        }}>
                            <Ionicons name="md-time-outline" size={18} color="black" />
                            <Text>{item.time} </Text>
                        </View>
                    </View>
                </View>
                <Text style={{
                    marginTop: 5,
                    color: COLORS.GREEN,
                    fontFamily: 'poppins'
                }}>{item.price == 0 ? 'Free' : item.price}</Text>
            </View>
            {completedChapter != undefined ?
                <CourseProgressBar
                    totalChapter={item?.chapters?.length}
                    completedChapter={completedChapter}
                /> : null}
        </View>
    )
}