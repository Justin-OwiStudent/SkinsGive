import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllAwps, getAllCompetitionsFromCollection, getAwp } from '../services/firebasedb'
import Competitions from '../components/Competitions'
import Ionicons from '@expo/vector-icons/Ionicons';


const SniperScreen = ({ navigation }) => {
   //MAAK N POPUP VIR AS JY IN N COMP GAN VIR UX, iets soos "here you can vote for comps"

   // maak n date, en dan doen calc van timestamp van skin met die timestamp van comp, comp timestamp maak ek in frontend


   const [awp, setAwp] = useState([])


   useEffect(() => {
      getAllCompeitions()
   }, [])

   //get for all competitions
   const getAllCompeitions = async () => {
      //   setRefreshing(true)
      console.log("getting data")
      const allCompetitions = await getAwp()
      setAwp(allCompetitions)
      console.log("here")
      //   setRefreshing(false)
   }

   const allcomps = awp.length;

   const back = () => {
      navigation.goBack()
   }

   const addNew = () => {
      navigation.navigate("Enter")
   }

   return (
      <View style={styles.container}>
         <TouchableOpacity onPress={back}>
            <Ionicons name="arrow-back-outline" size={50} color="#A12895" />
         </TouchableOpacity>
         <Text style={styles.title}> AWP competition entries </Text>
         {/* <Text style={styles.entries}> Amount of entries: </Text> */}

         <View style={styles.holder}>
            <Text style={styles.entries}> Entries </Text>

            <View style={styles.amount}><Text style={styles.amountOf}>{allcomps} </Text></View>
            {/* <Text style={styles.entries}> Entries </Text> */}
            <TouchableOpacity style={styles.add} onPress={addNew}>
               <Ionicons name="add-circle-outline" size={50} color="#A12895" />
            </TouchableOpacity>
         </View>


         <ScrollView>
            {awp.map((Competition, index) => (
               <TouchableOpacity key={index}
                  onPress={() => navigation.navigate("AwpDetails", { Competition })}
                  activeOpacity={0.75}>
                  <Competitions data={Competition} />
               </TouchableOpacity>
            ))}
         </ScrollView>
      </View>
   )
}

export default SniperScreen

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