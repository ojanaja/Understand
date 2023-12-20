import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { useUser } from '@clerk/clerk-expo'
import COLORS from '../../Utils/Colors';
import coin from './../../../assets/images/coin.png'
import { Ionicons } from '@expo/vector-icons';
import { UserPointsContext } from '../../Context/UserPointsContext';

const Header = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const { userPoints } = useContext(UserPointsContext);
    return isLoaded && (
        <View>
            <View style={[{ justifyContent: 'space-between', marginTop: 20 }, styles.rowStyle]}>
                <View style={styles.rowStyle}>
                    <Image source={{ uri: user?.imageUrl }}
                        style={{ width: 45, height: 45, borderRadius: 99 }} />
                    <View>
                        <Text style={{ color: COLORS.SECONDARY, fontFamily: 'poppins', marginBottom: -5 }} >Welcome</Text>
                        <Text style={styles.mainText} >{user?.fullName}</Text>
                    </View>
                </View>
                <View style={styles.rowStyle}>
                    <Image source={coin} style={{ width: 25, height: 25 }} />
                    <Text style={styles.mainText}>{userPoints}</Text>
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
                height: 40,
                marginTop: 25
            }}>

                <TextInput placeholder='Search Course' style={{ fontFamily: 'poppins', fontSize: 15, width: 200 }} />
                <Ionicons name="search-circle" size={34} color={COLORS.GREEN} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainText: {
        color: COLORS.PRIMARY,
        fontSize: 18,
        fontFamily: 'semi',
    },
    rowStyle: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    }
})


export default Header