import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function OptionItem({ icon, value }) {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center', gap: 5, marginTop: 3
        }}>
            <Ionicons name={icon} size={18} color="black" />
            <Text style={{ fontFamily: 'poppins' }}>{value}</Text>

        </View>
    )
}