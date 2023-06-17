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
      console.log(allCompetitions)
    //   setRefreshing(false)
    }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>M4A4 competition entries</Text>
        <TouchableOpacity style={styles.add} onPress={addNew}>
            <Ionicons name="add-circle-outline" size={50} color="#A12895" />
         </TouchableOpacity>
         <ScrollView>
         {M4.map((Competition, index) => (
               <TouchableOpacity key={index}
                  onPress={() => navigation.navigate("Details", { Competition })}
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
    title: {
        textAlign: 'center',
        fontSize: 18,
        color: '#A12895',
        marginBottom: 30,
  
     },
     container: {
        padding: 20,
        backgroundColor: "#202226",
        height: "100%"
     }
})