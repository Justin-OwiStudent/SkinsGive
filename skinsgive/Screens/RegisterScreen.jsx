import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native'

import React, { useState } from 'react'
import { registerNewUser } from '../services/firebaseAuth'

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const registerUser = () => {
        console.log("Registering...")
        registerNewUser(email, password)
    }


    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={require("../assets/Howl.png")} />
            <Text style={styles.intro}>Lets get you Signed up !</Text>

            <View style={styles.inputView}>
                <Text style={styles.inputLabel}>Username </Text>
                <TextInput style={styles.input} />

                <Text style={styles.inputLabel}>E-mail</Text>
                <TextInput style={styles.input}
                    onChangeText={(newValue) => setEmail(newValue)}
                />

                <Text style={styles.inputLabel}>Rank</Text>
                <TextInput style={styles.input} />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput style={styles.input}
                    onChangeText={(newValue) => setPassword(newValue)}
                />

                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput style={styles.input} />
            </View>
            <View>
                <TouchableOpacity title="Register" style={styles.loginbtn} onPress={registerUser}>
                    <Text style={styles.loginbtnText}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dontHaveText}>
                <Text style={styles.NoAccount}>Already have an Account? <Text style={styles.goReg} onPress={() => navigation.goBack()}>Login</Text> </Text>
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#202226",
      height: "100%"
    },
    logo: {
        width: 200,
        alignSelf: 'center',
        height: 100,

    },
    intro: {
        textAlign: 'center',
        color: 'white',
        marginTop: 20,
        marginBottom: 10,
        fontSize: 20
    },
    inputView: {
        marginBottom: 10,
        // backgroundColor: 'red'
    },
    inputLabel: {
        fontSize: 12,
        marginTop: 10,
        paddingLeft: 50,
        marginBottom: 5,
        color: 'white'
    },
    input: {
        backgroundColor: '#393B3F',
        height: 50,
        width: 300,
        borderRadius: 20,
        color: 'white',
        alignSelf: 'center',
        paddingLeft: 20
    },

    loginbtn: {
        width: 200,
        // height: 50,
        backgroundColor: '#A12895',
        borderRadius: 5,
        marginTop: 30,
        padding: 10,
        marginBottom: 20,
        borderRadius: 20,
        alignSelf: 'center'
    },
    loginbtnText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    NoAccount: {
        color: 'white'
    },
    goReg: {
        color: '#A12895',

    },
    dontHaveText: {
        // textAlign: 'center'
        alignSelf: 'center',
        marginTop: 50
    }
})