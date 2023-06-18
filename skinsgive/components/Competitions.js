import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { updateScore } from '../services/firebasedb';


const Competitions = (props, {navigation}) => {

    const {data} = props

    const CompId = data.id;
    console.log(CompId)

//     const [score, setScore] = useState("")

//   const upscore = () => {
//     data.score += 1;
//     // currentScore += 1
//     // data.score.save()
//     // setScore(currentScore)
//     // console.log(currentScore)
//     // console.log(score)
//     UpdateTheScore()

//   }

//   const downScore = () => {
//     currentScore = data.score -= 1;
//     // currentScore -- 1

//     // data.score.save()
//     setScore(currentScore)
//     console.log(currentScore)
//     console.log(score)
//     UpdateTheScore()
//   }


//   const UpdateTheScore = async () => {
//     var CompetitionDetails = {
//        score
//     };
//     await updateScore(CompetitionDetails, CompId).then(() => {
//         Alert.alert("Score updated!");
//         // navigation.goBack();
//     })
// }


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


{/* <View style={styles.voting}> 
<           TouchableOpacity  onPress={upscore}>
                <Ionicons name="arrow-up-circle-outline" size={35} color="green" />
            </TouchableOpacity>

            <TouchableOpacity onPress={downScore} >
                <Ionicons name="arrow-down-circle-outline" size={35} color="red" />
            </TouchableOpacity>
</View> */}
           

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