import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
// import Markdown from 'react-native-markdown-display';

const EnterCompetitionScreen = () => {

    const copy = `
    Follow these easy steps:

    1. 
    2.
    3.
    
    `

    return (
        // <View style={styles.container}>

            <View style={styles.EnterDetails}>
                <Text style={styles.WantEnter}>Want to take part in the M4 competition?</Text>
                <Text style={styles.Followsteps}>Follow these easy steps</Text>
                <Text style={styles.steps}>
                    1.
                </Text>
                <Text style={styles.steps}>
                    2.
                </Text>
                <Text style={styles.steps}>
                    3.
                </Text>

                <Text style={styles.SkinNameLabel}>Skin name</Text>
                <TextInput style={styles.SkinName}/> 


                <Text style={styles.SkinUploadLabel}>Skin name</Text>
                <TextInput style={styles.SkinImage}/> 

                <View style={styles.upload}></View>
            </View>

        

    )
}

export default EnterCompetitionScreen

const styles = StyleSheet.create({
    container: {
        // marginLeft: -100
    },
    EnterDetails: {
        alignSelf: 'flex-start'
    },
    WantEnter: {
        color: 'white',
        marginBottom: 20,
        marginLeft: 20
    },
    Followsteps: {
        color: 'white',
        marginBottom: 20,
        marginLeft: 20

    },
    steps: {
        color: 'white',
        textAlign: "left",
        marginLeft: 25

    },
    
    SkinNameLabel: {
        fontSize: 12,
        marginTop: 20,
        paddingLeft: 30,
        marginBottom: 5,
        color: 'white'
    },
    SkinName: {
        backgroundColor: '#393B3F',
        height: 50,
        width: 300,
        borderRadius: 20,
        color: 'white',
        marginLeft: 30
    },
    SkinUploadLabel: {
        fontSize: 12,
        marginTop: 20,
        paddingLeft: 30,
        marginBottom: 5,
        color: 'white'
    },
    SkinImage: {
        backgroundColor: '#393B3F',
        height: 200,
        width: 325,
        borderRadius: 20,
        color: 'white',
        marginLeft: 30
    },
    upload: {
        width: 150,
        height: 50,
        backgroundColor: '#A12895',
        marginLeft: 30,
        marginTop: 20,
        borderRadius: 20
    }
})