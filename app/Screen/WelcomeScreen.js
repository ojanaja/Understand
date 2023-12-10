import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import COLORS from '../Utils/Colors'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import character from '../../assets/images/Character.png'

const WelcomeScreen = ({ navigation }) => {
    return (
        <LinearGradient
            colors={[COLORS.GREEN, COLORS.PRIMARY]}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 1, y: 0.6 }}
            style={{
                height: '100%',

            }}
        >
            <View>
                <View>
                    <Image
                        source={character}
                        style={{
                            height: 350,
                            width: 350,
                            position: 'absolute',
                            top: 100,
                            left: 30,
                        }}
                    />
                </View>
                <View
                    style={{
                        paddingHorizontal: 30,
                        position: 'absolute',
                        top: 500,
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'bold',
                            fontSize: 35,
                            color: COLORS.BLACK
                        }}
                    >Discover your</Text>
                    <Text
                        style={{
                            fontFamily: 'bold',
                            fontSize: 35,
                            color: COLORS.BLACK,
                            top: -15,
                        }}
                    >Knowledge Here</Text>
                    <Text
                        style={{
                            fontFamily: 'poppins',
                            fontSize: 10,
                            color: COLORS.BLACK,
                            textAlign: 'center',
                            top: -15,
                        }}
                    >Explore your Knowledge with Understand - Your Gateway to Enriching Futures.</Text>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={{
                            backgroundColor: COLORS.BLACK,
                            width: '40%',
                            height: 45,
                            top: 670,
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowColor: COLORS.BLACK,
                            elevation: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.PRIMARY,
                                fontFamily: 'semi'
                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                        style={{
                            width: '40%',
                            backgroundColor: COLORS.PRIMARY,
                            height: 45,
                            top: 670,
                            borderWidth: 2,
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowColor: COLORS.BLACK,
                            elevation: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.BLACK,
                                fontFamily: 'semi'
                            }}
                        >
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </LinearGradient>
    )
}

export default WelcomeScreen