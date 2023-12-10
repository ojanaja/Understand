import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '../Utils/Colors';
import { OtpInput } from "react-native-otp-entry";
import { useSignUp } from "@clerk/clerk-expo";

const CodeVerificationScreen = ({ navigation }) => {
    const [code, setCode] = React.useState("");
    const { isLoaded, signUp, setActive } = useSignUp();

    const onPressVerify = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            await setActive({ session: completeSignUp.createdSessionId });
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <SafeAreaView
            style={{
                backgroundColor: COLORS.PRIMARY,
                height: '100%',
            }}
        >
            <View
                style={{
                    paddingHorizontal: 20,
                    marginTop: 50,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                >
                    <MaterialCommunityIcons name="arrow-left-thin" size={35} color="black" />
                </TouchableOpacity>
                <Text
                    style={{
                        marginLeft: 90,
                        fontFamily: 'semi',
                        fontSize: 20
                    }}
                >
                    Verification
                </Text>
            </View>
            <View>
                <Text
                    style={{
                        fontFamily: 'bold',
                        fontSize: 40,
                        paddingHorizontal: 25,
                        marginTop: 40
                    }}
                >
                    Enter your verification code
                </Text>
            </View>
            <View
                style={{
                    paddingHorizontal: 25,
                    marginVertical: 20
                }}
            >
                <OtpInput
                    numberOfDigits={6}
                    focusColor="black"
                    hideStick
                    onFilled={(code) => setCode(code)}
                    theme={{
                        pinCodeTextStyle: styles.pinCodeTextStyle,
                        focusedPinCodeContainerStyle: styles.focusPinCodeContainerStyle
                    }}
                />
            </View>
            <View>
                <Text
                    style={{
                        paddingHorizontal: 25,
                        fontFamily: 'poppins',
                        fontSize: 15,
                        maxWidth: 400,
                        marginTop: 10
                    }}
                >
                    We've send verification code to your email. You can check your inbox.
                </Text>
            </View>
            <View
                style={{
                    paddingHorizontal: 25,
                    marginTop: 20
                }}
            >
                <TouchableOpacity
                    onPress={onPressVerify}
                    style={{
                        backgroundColor: COLORS.BLACK,
                        width: '100%',
                        height: 45,
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
                        Verify
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pinCodeTextStyle: {
        fontFamily: "semi",
        fontSize: 25,
    },
    focusPinCodeContainerStyle: {
        borderWidth: 1
    }
});

export default CodeVerificationScreen