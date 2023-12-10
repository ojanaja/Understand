import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useSignUp } from "@clerk/clerk-expo";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const SignUpScreen = ({ navigation }) => {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    const { isLoaded, signUp, setActive } = useSignUp();

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [passwordsMatch, setPasswordsMatch] = React.useState(true);

    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

    const onConfirmPasswordChange = (confirmPassword) => {
        setConfirmPassword(confirmPassword);
        setPasswordsMatch(password === confirmPassword);
    };

    const onSignUpPress = async () => {
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        if (!emailAddress && !password && !confirmPassword) {
            setEmailError("Email is required");
            setPasswordError("Password is required");
            setConfirmPasswordError("Confirm Password is required");
            return;
        }

        if (!emailAddress) {
            setEmailError("Email is required");
            return;
        }

        if (!password) {
            setPasswordError("Password is required");
            return;
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Confirm Password is required");
            return;
        }

        if (!passwordsMatch) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                emailAddress,
                password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            navigation.navigate('CodeVerification');
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
                    padding: 20,
                }}
            >
                <Text
                    style={{
                        marginTop: 100,
                        fontFamily: 'bold',
                        fontSize: 25,
                        textAlign: 'center',
                        color: COLORS.BLACK,
                    }}
                >Create Account</Text>
                <Text
                    style={{
                        fontFamily: 'semi',
                        fontSize: 15,
                        marginBottom: 50,
                        color: COLORS.BLACK,
                        textAlign: 'center',
                    }}
                >Create an account so you can discover knowledge.</Text>
            </View>
            <View>
                <TextInput
                    value={emailAddress}
                    autoCapitalize='none'
                    placeholder='Email'
                    onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                    style={{
                        fontFamily: 'poppins',
                        marginHorizontal: 15,
                        padding: 15,
                        borderRadius: 10,
                        backgroundColor: COLORS.SECONDARY,
                        marginVertical: 10,
                        borderColor: emailError ? COLORS.BLACK : COLORS.SECONDARY,
                        borderWidth: emailError ? 1 : 0,
                    }}
                />
                {emailError ? (
                    <Text style={{ color: COLORS.ERROR, marginHorizontal: 20, fontFamily: 'poppins', fontSize: 12 }}>{emailError}</Text>
                ) : null}
                <TextInput
                    value={password}
                    placeholder='Password'
                    onChangeText={(password) => setPassword(password)}
                    secureTextEntry={true}
                    style={{
                        fontFamily: 'poppins',
                        marginHorizontal: 15,
                        padding: 15,
                        borderRadius: 10,
                        backgroundColor: COLORS.SECONDARY,
                        marginVertical: 10,
                        borderColor: passwordError ? COLORS.BLACK : COLORS.SECONDARY,
                        borderWidth: passwordError ? 1 : 0,
                    }}
                />
                {passwordError ? (
                    <Text style={{ color: COLORS.ERROR, marginHorizontal: 20, fontFamily: 'poppins', fontSize: 12 }}>{passwordError}</Text>
                ) : null}
                <TextInput
                    value={confirmPassword}
                    placeholder='Confirm Password'
                    onChangeText={onConfirmPasswordChange}
                    secureTextEntry={true}
                    style={{
                        fontFamily: 'poppins',
                        marginHorizontal: 15,
                        padding: 15,
                        borderRadius: 10,
                        backgroundColor: COLORS.SECONDARY,
                        marginVertical: 10,
                        borderColor: confirmPasswordError ? COLORS.BLACK : COLORS.SECONDARY,
                        borderWidth: confirmPasswordError ? 1 : 0,
                    }}
                />
                {confirmPasswordError ? (
                    <Text style={{ color: COLORS.ERROR, marginHorizontal: 20, fontFamily: 'poppins', fontSize: 12 }}>{confirmPasswordError}</Text>
                ) : null}
            </View>
            <View
                style={{
                    alignItems: 'center',
                    marginTop: 50,
                    marginHorizontal: 15,

                }}
            >
                <TouchableOpacity
                    onPress={onSignUpPress}
                    style={{
                        backgroundColor: COLORS.BLACK,
                        width: '100%',
                        opacity: passwordsMatch ? 1 : 0.5,
                        height: 45,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: COLORS.BLACK,
                        elevation: 5,
                    }}
                    disabled={!passwordsMatch}
                >
                    <Text
                        style={{
                            color: COLORS.PRIMARY,
                            fontFamily: 'semi'
                        }}
                    >
                        Sign up
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{
                        marginVertical: 30
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'semi',
                            fontSize: 14
                        }}
                    >
                        Already have an account
                    </Text>
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 12,
                        fontFamily: 'semi'
                    }}
                >
                    Or continue with
                </Text>
            </View>
            <View
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 30,
                    marginVertical: 25
                }}
            >
                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        backgroundColor: COLORS.SECONDARY,
                        width: '90%',
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        shadowColor: COLORS.BLACK,
                        elevation: 5,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10
                    }}
                >
                    <Ionicons name="ios-logo-google" size={24} color="black" />
                    <Text
                        style={{
                            fontFamily: 'semi'
                        }}
                    >
                        Sign up with Google
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SignUpScreen;
