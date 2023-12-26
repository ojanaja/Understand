import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../Utils/Colors'
import OptionItem from './OptionItem'


export default function DetailSection({ course, enrollCourse, userEnrolledCourse }) {
    return (
        <View style={{ padding: 10, borderRadius: 15, backgroundColor: COLORS.PRIMARY }}>
            <Image source={{ uri: course?.banner?.url }}
                style={{ width: Dimensions.get('screen').width * 0.85, height: 200, borderRadius: 20 }}
            />

            <View style={{ padding: 10 }}>
                <Text style={{ fontFamily: 'bold', fontSize: 19, marginTop: 10 }}>{course.name}</Text>

                <View >
                    <View style={styles.rowStyle}>
                        <OptionItem icon={'book-outline'} value={course.chapters?.length + " Chapters"} />
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

                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'space-between' }}>

                    {userEnrolledCourse?.length == 0 ? <TouchableOpacity
                        onPress={() => enrollCourse()}
                        style={{
                            backgroundColor: COLORS.GREEN,
                            borderRadius: 10,
                            justifyContent: 'center',
                            paddingHorizontal: 10,
                            height: 40,
                            elevation: 1,
                            width: "100%"
                        }}>
                        <Text style={{
                            fontFamily: 'semi',
                            color: COLORS.PRIMARY,
                            fontSize: 13,
                            textAlign: 'center'
                        }}>Enroll For Free</Text>
                    </TouchableOpacity> : null}


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
