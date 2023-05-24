import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const [loading, setLoading] = useState(false)


    const logOn = () => {

        setLoading(true)

        if (!email || !password) {
            Alert.alert("try again"), [
                { text: 'Try again', onPress: () => { setLoading(false) } }
            ]
        } else {
            //make auth call

            setLoading(true)
            Alert.alert("your in"), [
                { text: 'Thanks', onPress: () => { setLoading(false) } }
            ]

        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image style={styles.logo} source={require("../assets/Howl.png")} />
                <Text style={styles.intro}>Lets get you Logged in !</Text>

                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}>Username or E-mail</Text>
                    <TextInput style={styles.input}
                        defaultValue={email}
                        onChangeText={(newValue) => setEmail(newValue)}
                    />

                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput style={styles.input}
                        defaultValue={password}
                        onChangeText={(newValue) => setPassword(newValue)}

                    />
                </View>
                <View>
                    <TouchableOpacity title="Login" style={styles.loginbtn}>
                        <Text style={styles.loginbtnText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dontHaveText}>
                    <Text style={styles.NoAccount}>Dont have an Account? <Text style={styles.goReg} onPress={() => navigation.navigate('Register')}>Register</Text> </Text>
                </View>
            </View>

            {/* { !loading ? (
    <View>
            <TouchableOpacity style={styles.submitButton} onPress={logOn}>
                <Text style={styles.submitButtonText}>Login</Text>
            </TouchableOpacity>

            
            <Button title="Need an account?" color={'red'} onPress={() => navigation.push('Register')}/>
        </View>
    ) : <ActivityIndicator animating={loading} size={40}/> } */}

        </SafeAreaView>
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
        marginBottom: 75,
        // backgroundColor: 'red'
    },
    inputLabel: {
        fontSize: 12,
        marginTop: 20,
        paddingLeft: 5,
        marginBottom: 5,
        color: 'black'
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