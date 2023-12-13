import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import COLORS from '../../Utils/Colors';
import coin from './../../../assets/images/coin.png'
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    return isLoaded && (
        <View>
            <View style={[{ justifyContent: 'space-between' }, styles.rowStyle]}>
                <View style={styles.rowStyle}>
                    <Image source={{ uri: user?.imageUrl }}
                        style={{ width: 50, height: 50, borderRadius: 99 }} />
                    <View>
                        <Text style={{ color: COLORS.PRIMARY, fontFamily: 'poppins' }} >Welcome,</Text>
                        <Text style={styles.mainText} >{user?.fullName}</Text>
                    </View>
                </View>
                <View style={styles.rowStyle}>
                    <Image source={coin} style={{ width: 35, height: 35 }} />
                    <Text style={styles.mainText}>3538</Text>
                </View>
            </View>
            <View style={{
                backgroundColor: COLORS.PRIMARY,
                paddingLeft: 20,
                display: 'flex',
                flexDirection: 'row',
                borderRadius: 99,
                paddingRight: 5,
                justifyContent: 'space-between',
                marginTop: 25
            }}>

                <TextInput placeholder='Search Courses' style={{ fontFamily: 'poppins', fontSize: 17 }} />
                <Ionicons name="search-circle" size={50} color={COLORS.GREEN} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainText: {
        color: COLORS.PRIMARY,
        fontSize: 20,
        fontFamily: 'poppins',
    },
    rowStyle: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',

    }
})


export default Header