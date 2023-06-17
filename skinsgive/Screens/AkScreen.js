import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAk } from '../services/firebasedb'
import Competitions from '../components/Competitions'
import Ionicons from '@expo/vector-icons/Ionicons';


const AkScreen = ({navigation}) => {

    const [Ak, setAk] = useState([])

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
      const allCompetitions = await getAk()
      setAk(allCompetitions)
      console.log(allCompetitions)
    //   setRefreshing(false)
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AK-47 competition entries</Text>
        <TouchableOpacity style={styles.add} onPress={addNew}>
            <Ionicons name="add-circle-outline" size={50} color="#A12895" />
         </TouchableOpacity>
         <ScrollView>
         {Ak.map((Competition, index) => (
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

export default AkScreen

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