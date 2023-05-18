import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileScreen = () => {
    return (
        <View style={styles.comntainer}>

            <View style={styles.ProfileSection}>
                <Text style={styles.ProfileText}> Profile </Text>
                <View style={styles.profilePicture}>

                </View>
                <Text style={styles.username}> Xxtreamdeath </Text>
                
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


            <View style={styles.navBar}> 
      <Image style={styles.navIcon} source={require("../assets/CompLogo.png")}/>
      <Image style={styles.navIcon} source={require("../assets/CompLogo.png")}/>
      <Image style={styles.navIcon} source={require("../assets/CompLogo.png")}/>

    </View>

        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    ProfileText: {
        textAlign: 'center',
        color: '#A12895',
        fontSize: 20,
        marginBottom: 15
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
        color: 'white',
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