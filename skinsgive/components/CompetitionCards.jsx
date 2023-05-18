import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CompetitionCards = () => {
  return (
    <View style={styles.card}>
        <View style={styles.timer}>
            <Text style={styles.time}> 00:00:00 </Text>
        </View>
        <View style={styles.skinSection}>
            <Image style={styles.skin} source={require("../assets/Howl.png")}/>
            <Text style={styles.skinName}> M4A4 Howl</Text>
        </View>
        <View style={styles.enties}>
            <Text style={styles.entriesText}> Entries: 0</Text>
            <View style={styles.btn}>
                <Text style={styles.enterText}> Enter Competition</Text>
            </View>

        </View>
        {/* <View style={styles.timer}>  </View> */}
        {/* <View style={styles.skinSection}></View> */}
      {/* <Text>CompetitionCards</Text> */}
    </View>
  )
}

export default CompetitionCards

const styles = StyleSheet.create({
    card: {
        width: 350,
        height: 250,
        backgroundColor: '#2E3034',
        marginTop: 25,
        borderRadius: 25
    },
    timer: {
        width: 100,
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
        height: 65,
        width: 300,
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 20,
        resizeMode: 'cover'
    },
    skinName: {
        textAlign: 'center',
        color: 'white',
        // textDecorationLine: 'underline'
    },
    enties: {
        width: 300,
        height: 50,
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
    }
})