import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';


const Competitions = (props) => {

    const {data} = props

    //TODO: count the amount of entries and show on card

    //TODO: do the timestamp


  return (
    <View style={styles.card}>
        <View style={styles.timer}>
            <Text style={styles.time}>{data.name}</Text>
        </View>
        <View style={styles.skinSection}>
            <Image style={styles.skin} source={require("../assets/M4.png")}/>
            {/* <Text style={styles.skinName}> {data.name}</Text> */}
        </View>
        <View style={styles.enties}>


<View style={styles.voting}> 
<TouchableOpacity  >
                <Ionicons name="arrow-up-circle-outline" size={35} color="green" />
            </TouchableOpacity>

            <TouchableOpacity >
                <Ionicons name="arrow-down-circle-outline" size={35} color="red" />
            </TouchableOpacity>
</View>
           

            <Text style={styles.scoreText}>Score: {data.score} </Text>

            {/* <Text style={styles.entriesText}> Entries: {data.Entries}</Text> */}

            {/* <TouchableOpacity style={styles.btn} activeOpacity={0.75}  onPress={addNew}  >
                <Text style={styles.enterText}> Enter Competition</Text>
            </TouchableOpacity> */}

        </View>
    </View>
  )
}

export default Competitions

const styles = StyleSheet.create({
    card: {
        width: 350,
        height: 250,
        backgroundColor: '#2E3034',
        marginTop: 25,
        borderRadius: 25
    },
    timer: {
        width: 200,
        height: 30,
        backgroundColor: '#A12895',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 20,
        padding: 6
    },
    time: {
        textAlign: 'center',
        color: 'white'
        
    },
    skinSection: {
        width: 300,
        height: 125,
        backgroundColor: '#393B3F',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 20,
        border: 5
    },
    skin: {
        height: 100,
        width: 300,
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 10,
        resizeMode: 'contain',
        // backgroundColor: "red"
    },
    skinName: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20
        // textDecorationLine: 'underline'
    },
    enties: {
        width: 300,
        height: 50,
        flexDirection: "row",
        // backgroundColor: 'red',
        alignSelf: 'center',
        marginTop: 10
    },
    entriesText: {
        fontSize: 12,
        marginTop: 15,
        color: 'white',
        alignSelf: 'flex-start'
    },
    btn: {
        width:150,
        height: 40,
        marginTop: 5,
        marginRight: 5,
        borderRadius: 25,
        backgroundColor: '#00A2E2',
        position: 'absolute',
        right: 0
    },
    enterText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 10
    },
    scoreText: {
        color: "white",
        marginTop: 0,
        position: "absolute",
        right: 20,
        top: 30
    },
    voting: {
        flexDirection: "row",
        position: "absolute",
        top: 20
    }
})