import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'

const LoginScreen = () => {
  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/Howl.png")}/>
        <Text style={styles.intro}>Lets get you Logged in !</Text>
       
    <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Username or E-mail</Text>
        <TextInput style={styles.input}/>

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput style={styles.input} />
    </View>
    <View>
        <TouchableOpacity title="Login" style={styles.loginbtn}>
            <Text style={styles.loginbtnText}>Login</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.dontHaveText}> 
        <Text style={styles.NoAccount}>Dont have an Account? <Text style={styles.goReg}>Register</Text> </Text>
    </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
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
        marginBottom: 75
    },
    inputLabel: {
        fontSize: 12,
        marginTop: 20,
        paddingLeft: 5,
        marginBottom: 5,
        color: 'white'
    },
    input: {
        backgroundColor: '#393B3F',
        height: 50,
        width: 300,
        borderRadius: 20,
        color: 'white',
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