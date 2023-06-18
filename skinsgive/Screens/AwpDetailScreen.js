import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { updateAwpScore } from '../services/firebasedb';


const AwpDetailScreen = ({ route, navigation }) => {

    const { Competition } = route.params;
    

    const CompId = Competition.id;
 

    const [score, setScore] = useState(Competition.score);
    const [scoreUp, setScoreUp] = useState(Competition.score);


    //if currentuser === createduser, cant vote

    const upscore = () => {
        currentScore = Competition.score += 1;
        setScoreUp(currentScore)
        setScore(scoreUp)
        UpdateTheScore()
    }


    const UpdateTheScore = async () => {
        var CompetitionDetails = {
            score
        };
        await updateAwpScore(CompetitionDetails, CompId).then(() => {
            Alert.alert("You voted for: " + Competition.name);
            navigation.goBack();
        })
    }

    const back = () => {
        navigation.goBack()
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={back}>
                <Ionicons name="arrow-back-outline" size={50} color="#A12895" />
            </TouchableOpacity>
            <View style={styles.imageHere}>

            </View>

            <Text style={styles.inputLabel}>Skin name</Text>
            <View style={styles.scorehere}>
                <Text style={styles.title}> {Competition.name} </Text>
            </View>

            <Text style={styles.inputLabel}>Gun Type</Text>
            <View style={styles.scorehere}>
                <Text style={styles.title}> {Competition.value} </Text>
            </View>


            <View style={styles.skinInfo}>
                <Text style={styles.title}> Like the skin ? </Text>
                <Text style={styles.title}> Vote for it !</Text>


                <TouchableOpacity onPress={upscore}>
                    <View style={styles.voteHere}>
                        <Text style={styles.voteText}>Vote Here</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AwpDetailScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,

        backgroundColor: "#202226",
        height: "100%"
    },
    imageHere: {
        width: '90%',
        height: 150,
        backgroundColor: '#393B3F',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 20
    },
    scorehere: {
        width: '80%',
        height: 30,
        backgroundColor: '#393B3F',
        alignSelf: 'center',
        marginTop: 0,
        borderRadius: 20
    },
    skinInfo: {
        width: '90%',
        height: 150,
        backgroundColor: '#393B3F',
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 20
    },
    info: {
        marginTop: 5,
        marginLeft: 5,
        fontSize: 18,
        color: '#A12895',
        textAlign: "left"
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        color: '#A12895',
        marginBottom: 0,
    },
    infoText: {
        fontSize: 15,
        color: '#A12895',
    },
    voteHere: {
        width: "80%",
        height: 50,
        backgroundColor: "#A12895",
        alignSelf: "center",
        marginTop: 25,
        borderRadius: 15,
        padding: 10
    },
    voteText: {
        color: "white",
        textAlign: "center",
        fontSize: 25,

    },
    inputLabel: {
        fontSize: 12,
        marginTop: 20,
        paddingLeft: 25,
        marginBottom: 5,
        color: '#A12895'
    },
})