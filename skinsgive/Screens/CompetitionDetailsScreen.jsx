import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllSkins, updateScore } from '../services/firebasedb'
import CompetitionCards from '../components/CompetitionCards'
import Ionicons from '@expo/vector-icons/Ionicons';


const CompetitionDetailsScreen = ({ route, navigation }) => {

   
   


    return (
        <View style={styles.container}>
         <Text style={styles.title}> {Competition.name} </Text>

         <View style={styles.voting}> 
<           TouchableOpacity  onPress={upscore}>
                <Ionicons name="arrow-up-circle-outline" size={35} color="green" />
            </TouchableOpacity>

            <TouchableOpacity onPress={downScore} >
                <Ionicons name="arrow-down-circle-outline" size={35} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={UpdateTheScore} >
                <Ionicons name="arrow-down-circle-outline" size={35} color="blue" />
            </TouchableOpacity>
</View>

      

        </View>
    )
}

export default CompetitionDetailsScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    entries: {
        width: '80%',
        height: 100,
        backgroundColor: '#393B3F',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 20
    },
    entryOne: {
        color: 'white',
        textAlign: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        color: '#A12895',
        marginBottom: 15,
  
     },
})