import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getCurrentUser, signOutUser } from '../services/firebaseAuth'
import Ionicons from '@expo/vector-icons/Ionicons';


const ProfileScreen = () => {

    const user = getCurrentUser()
    console.log(user)

    return (
        <View style={styles.container}>

            <View style={styles.ProfileSection}>
                <Text style={styles.ProfileText}> Profile </Text>
                <View style={styles.profilePicture}>
                    {/* {user.photoURL} */}
                </View>
                <Text style={styles.username}> {user.displayName} </Text>

                <Image style={styles.Rank} source={require("../assets/DMG.png")} />
            </View>

            <View style={styles.CompDetails}>

                <View style={styles.compEntered}>
                    <Text style={styles.enter}> Competitions Entered </Text>
                    <Text style={styles.enterAmount}> 0 </Text>
                </View>

                <View style={styles.compWon}>
                    <Text style={styles.Won}> Competitions Won </Text>
                    <Text style={styles.WonAmount}> 0 </Text>
                </View>

            </View>
            <TouchableOpacity style={styles.logout} onPress={() => signOutUser()}>
                {/* <Ionicons name="person-circle-outline" size={30} color="black" /> */}
                <Text style={styles.logoutText}>Logout!</Text>
            </TouchableOpacity>

        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    logout: {
        width: 150,
        height: 50,
        backgroundColor: "#A12895",
        marginLeft: "60%",
        borderRadius: 10,
        marginTop: 80
    },
    logoutText: {
        fontSize: 25,
        marginLeft: 35,
        marginTop: 10
    },
    container: {
        padding: 20,
        backgroundColor: "#202226",
        height: "100%"
    },
    ProfileText: {
        textAlign: 'center',
        color: '#A12895',
        fontSize: 20,
        marginBottom: 15,
        marginTop: 35
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#2E3034',
        border: 1,
        borderColor: '#A12895',
        alignSelf: 'center',

    },
    username: {
        textAlign: 'center',
        color: '#A12895',
        fontSize: 25,
        marginTop: 5
    },
    Rank: {
        width: 150,
        height: 60,
        // backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 25,
        resizeMode: 'contain',

    },
    CompDetails: {
        width: 350,
        height: 150,
        // backgroundColor: 'red',
        marginTop: 50,
        flexDirection: 'row'
    },
    compEntered: {
        width: 150,
        height: 125,
        backgroundColor: '#2E3034',
        marginRight: 20,
        marginLeft: 15,
        marginTop: 10,
        borderRadius: 20
    },
    compWon: {
        width: 150,
        height: 125,
        backgroundColor: '#2E3034',
        marginTop: 10,
        borderRadius: 20
    },
    enter: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10
    },
    enterAmount: {
        color: '#A12895',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 20
    },
    Won: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10
    },
    WonAmount: {
        color: '#A12895',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 20
    },
    navBar: {
        width: 300,
        height: 60,
        backgroundColor: '#393B3F',
        marginBottom: 25,
        alignSelf: 'center',
        borderRadius: 25,
        zIndex: 999,
        flexDirection: 'row',
        paddingLeft: 25
    },
    navIcon: {
        width: 60,
        height: 60,
        marginRight: 35
    }
})


