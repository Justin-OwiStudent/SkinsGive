import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllAwps, getAllCompetitionsFromCollection, getAwp } from '../services/firebasedb'
import Competitions from '../components/Competitions'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';



const SniperScreen = ({ navigation }) => {



   const [awp, setAwp] = useState([])
   const [features, setFeatures] = useState([])


   useEffect(() => {
      getAllCompeitions()
      // getCurrentImage()
   }, [])


   const getCurrentImage = async () => {
      const result = await getAwpImage(CompId)
      setFeatures(result)
   }

   //get for all competitions
   const getAllCompeitions = async () => {

      const allCompetitions = await getAwp()
      setAwp(allCompetitions)

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
         <View style={styles.TopSection}>
            <TouchableOpacity onPress={back}>
               <Ionicons name="chevron-back-outline" size={30} color="white" />
               {/* <ion-icon name="chevron-back-outline"></ion-icon> */}
            </TouchableOpacity>
            <Text style={styles.title}> Entries </Text>
            <TouchableOpacity style={styles.add} onPress={addNew}>
               <Ionicons name="add-circle-outline" size={30} color="#FED32C" />
            </TouchableOpacity>

         </View>

         <ScrollView >
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
   TopSection: {
      flexDirection: "row",
      marginTop: 25,
      justifyContent: "space-between"
   },
   add: {
     
   },
   title: {
      textAlign: 'center',
      fontSize: 25,
      color: '#FED32C',
      marginBottom: 30,
      fontFamily: 'MontserratBold',
      marginLeft: -20
   },
   container: {
      padding: 20,
      paddingTop: 50,
      backgroundColor: "#202226",
      height: "100%"
   },
   entries: {
      fontSize: 20,
      color: "white",
      marginTop: 5
   },
   amount: {
      width: 30,
      height: 30,
      backgroundColor: "#D32026",
      borderRadius: 20,

   },
   amountOf: {
      color: "black",
      fontSize: 20,
      marginLeft: 9,
      marginTop: 2
   },
   holder: {
      flexDirection: "row",

   },

})