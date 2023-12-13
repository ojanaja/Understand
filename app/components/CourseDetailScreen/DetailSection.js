import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../Utils/Colors'
import OptionItem from './OptionItem'

export default function DetailSection({ course }) {
    return (
        <View style={{ padding: 10, borderRadius: 15, backgroundColor: COLORS.PRIMARY }}>
            <Image source={{ uri: course?.banner?.url }}
                style={{ width: Dimensions.get('screen').width * 0.85, height: 200, borderRadius: 20 }}
            />
            <View style={{ padding: 10 }}>
                <Text style={{ fontFamily: 'bold', fontSize: 19, marginTop: 10 }}>{course.name}</Text>

                <View >
                    <View style={styles.rowStyle}>
                        <OptionItem icon={'book-outline'} value={course.chapters?.lenght + "Chapters"} />
                        <OptionItem icon={'md-time-outline'} value={course.time} />
                    </View>

                    <View style={styles.rowStyle}>
                        <OptionItem icon={'person-circle-outline'} value={course?.author} />
                        <OptionItem icon={'cellular'} value={course.level} />
                    </View>
                </View>
                <View>
                    <Text style={{ fontFamily: 'bold', fontSize: 20 }}>Description</Text>
                    <Text style={{ fontFamily: 'light', color: COLORS.BLACK, lineHeight: 23 }}>{course?.description?.markdown}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 20, justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={{
                        padding: 15, backgroundColor: COLORS.GREEN,
                        borderRadius: 10
                    }}>
                        <Text style={{
                            fontFamily: 'bold',
                            color: COLORS.PRIMARY,
                            textAlign: 'center',
                            fontSize: 16
                        }}>Enroll For Free</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        padding: 15, backgroundColor: COLORS.SECONDARY,
                        borderRadius: 10
                    }}>
                        <Text style={{
                            fontFamily: 'bold',
                            color: COLORS.BLACK,
                            textAlign: 'center',
                            fontSize: 16
                        }}>Mambership IDR 9000/Mon</Text>

                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    }
})
