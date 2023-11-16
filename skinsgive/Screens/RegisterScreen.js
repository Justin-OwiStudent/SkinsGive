import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native'

import React, { useState } from 'react'
import { registerNewUser } from '../services/firebaseAuth'

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rank, setRank] = useState('')
    const [username, setUsername] = useState('')




    const registerUser = async () => {
        console.log("Registering...")
        registerNewUser(username, email, password, rank)
        // navigation.goBack()
        }


    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={require("../assets/CS_YELLOW.png")} />
            <Text style={styles.intro}>LETS GET YOU SIGNED UP!</Text>

            <View style={styles.inputView}>
                <Text style={styles.inputLabel}>USERNAME </Text>
                <TextInput style={styles.input}
                    onChangeText={(newValue) => setUsername(newValue)}
                
                />

                <Text style={styles.inputLabel}>EMAIL</Text>
                <TextInput style={styles.input}
                    onChangeText={(newValue) => setEmail(newValue)}
                />

                <Text style={styles.inputLabel}>RANK</Text>
                <TextInput style={styles.input} 
                onChangeText={(newValue) => setRank(newValue)}/>

                <Text style={styles.inputLabel}>PASSWORD</Text>
                <TextInput style={styles.input}
                    onChangeText={(newValue) => setPassword(newValue)}
                />

                {/* <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput style={styles.input} /> */}
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
        backgroundColor: "#20232A",
      height: "110%"
    },
    logo: {
        width: 200,
        alignSelf: 'center',
        height: 100,
        resizeMode: "contain"

    },
    intro: {
        textAlign: 'center',
        color: '#AEB3B9',
        marginTop: 20,
        marginBottom: 10,
        fontSize: 16,
        fontFamily: "MontserratRegular",
        

    },
    inputView: {
        marginBottom: 10,
        // backgroundColor: 'red'
    },
    inputLabel: {
        fontSize: 10,
        marginTop: 10,
        paddingLeft: 50,
        marginBottom: 5,
        color: '#AEB3B9'
    },
    input: {
        backgroundColor: '#2B2F38',
        height: 40,
        width: 300,
        borderRadius: 20,
        color: '#AEB3B9',
        alignSelf: 'center',
        paddingLeft: 20
    },

    loginbtn: {
        width: 200,
        // height: 50,
        backgroundColor: '#FED32C',
        borderRadius: 5,
        marginTop: 30,
        padding: 10,
        marginBottom: 20,
        borderRadius: 20,
        alignSelf: 'center'
    },
    loginbtnText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: "MontserratRegular",

    },
    NoAccount: {
        color: '#AEB3B9',
        fontFamily: "MontserratRegular",

    },
    goReg: {
        color: '#FED32C',
        fontFamily: "MontserratBold",


    },
    dontHaveText: {
        alignSelf: 'center',
        marginTop: 50
    }
})