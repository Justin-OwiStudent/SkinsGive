import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import { signInUser } from '../services/firebaseAuth'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)



    const logOn = async () => {

        setLoading(true)

        if (!email || !password) {
            Alert.alert("whoops", "please fill in all the feilds")


        } else {
            //make auth call
            await signInUser(email, password)
            setLoading(false)
        
         

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Image style={styles.logo} source={require("../assets/LOGO.png")} />
                <Text style={styles.intro}>LET'S GET LOGGED IN!</Text>

                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}>USERNAME & EMAIL</Text>
                    <TextInput style={styles.input}
                        defaultValue={email}
                        onChangeText={(newValue) => setEmail(newValue)}
                    />

                    <Text style={styles.inputLabel}>PASSWORD</Text>
                    <TextInput style={styles.input}
                        defaultValue={password}
                        onChangeText={(newValue) => setPassword(newValue)}

                    />
                </View>
                <View>
                    <TouchableOpacity title="Login" style={styles.loginbtn} onPress={logOn}>
                        <Text style={styles.loginbtnText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dontHaveText}>
                    <Text style={styles.NoAccount}>Don't have an Account? <Text style={styles.goReg} onPress={() => navigation.navigate('Register')}>Register</Text> </Text>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#20232A",
      height: "110%",
      
    },
    logo: {
        width: 200,
        alignSelf: 'center',
        height: 100,
        resizeMode: "contain",
        marginTop: 50

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
        marginBottom: 75,
    },
    inputLabel: {
        fontSize: 10,
        marginTop: 20,
        paddingLeft: 50,
        marginBottom: 5,
        color: '#AEB3B9',
        fontFamily: "MontserratRegular"

    },
    input: {
        backgroundColor: '#2B2F38',
        height: 40,
        width: 300,
        borderRadius: 20,
        color: '#AEB3B9',
        alignSelf: 'center',
        paddingLeft: 20,
        fontFamily: "MontserratRegular",


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
        fontFamily: "MontserratRegular"
        
    },
    NoAccount: {
        color: 'white',
        fontFamily: "MontserratRegular",

    },
    goReg: {
        color: '#FED32C',
        fontFamily: "MontserratBold",


    },
    dontHaveText: {
        // textAlign: 'center'
        alignSelf: 'center',
        marginTop: 50
    }
})