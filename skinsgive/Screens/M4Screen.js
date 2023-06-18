import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Competitions from '../components/Competitions'
import { getM4 } from '../services/firebasedb'
import Ionicons from '@expo/vector-icons/Ionicons';



const M4Screen = ({navigation}) => {

    const [M4, setM4] = useState([])

    const addNew = () => {
        navigation.navigate("Enter")
      }

    useEffect( () => {
       getAllCompeitions()
   }, [])
   
    //get for all competitions
    const getAllCompeitions = async () => {
    //   setRefreshing(true)
      console.log("getting data")
      const allCompetitions = await getM4()
      setM4(allCompetitions)
    //   setRefreshing(false)
    }

   const allcomps = M4.length;

   const back = () => {
    navigation.goBack()
 }


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={back}>
            <Ionicons name="arrow-back-outline" size={50} color="#A12895" />
         </TouchableOpacity>
      <Text style={styles.title}>M4A4 competition entries</Text>
      <View style={styles.holder}>
            <Text style={styles.entries}> Entries </Text>

            <View style={styles.amount}><Text style={styles.amountOf}>{allcomps} </Text></View>
            {/* <Text style={styles.entries}> Entries </Text> */}
            <TouchableOpacity style={styles.add} onPress={addNew}>
               <Ionicons name="add-circle-outline" size={50} color="#A12895" />
            </TouchableOpacity>
         </View>
         <ScrollView>
         {M4.map((Competition, index) => (
               <TouchableOpacity key={index}
                  onPress={() => navigation.navigate("M4Details", { Competition })}
                  activeOpacity={0.75}>
                  <Competitions data={Competition} />
               </TouchableOpacity>
            ))}
         </ScrollView>
      
    </View>
  )
}

export default M4Screen

const styles = StyleSheet.create({
  add: {
    zIndex: 900,
    marginLeft: 200
 },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: '#A12895',
    marginBottom: 30,

 },
 container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#202226",
    height: "100%"
 },
 entries: {
    fontSize: 20,
    color: "#A12895",
    marginTop: 5
 },
 amount: {
    width: 30,
    height: 30,
    backgroundColor: "#A12895",
    borderRadius: 20,

 },
 amountOf: {
    color: "black",
    fontSize: 20,
    marginLeft: 9,
    marginTop: 2
 },
 holder: {
    flexDirection: "row"
 }
})