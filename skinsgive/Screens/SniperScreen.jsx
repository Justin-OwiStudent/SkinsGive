import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllAwps, getAllCompetitionsFromCollection, getAwp } from '../services/firebasedb'
import Competitions from '../components/Competitions'
import Ionicons from '@expo/vector-icons/Ionicons';


const SniperScreen = ({navigation}) => {



   //MAAK N POPUP VIR AS JY IN N COMP GAN VIR UX, iets soos "here you can vote for comps"

// maak n date, en dan doen calc van timestamp van skin met die timestamp van comp, comp timestamp maak ek in frontend



   // const [competitions, setCompetitions] = useState([])


//    useEffect( () => {
//       getAllCompeitions()
//   }, [])
  
//    //get for all competitions
//    const getAllCompeitions = async () => {
//    //   setRefreshing(true)
//      console.log("getting data")
//      const allCompetitions = await getAllAwps()
//      setCompetitions(allCompetitions)
//      console.log(allCompetitions)
//    //   setRefreshing(false)
//    }
  

   //  const [awps, setAwps] = useState([])

   //  useEffect( () => {
   //    getAwp()
   //  }, [])
    

   
   //   const getAwp = async () => {
   //  //    setRefreshing(true)
   //     console.log("getting data...")
   //     const AllAwpSkins = await getAllAwps()
   //     setAwps(AllAwpSkins)
   //     console.log(AllAwpSkins)
   //  //    setRefreshing(false)
   //   }

   const [awp, setAwp] = useState([])


   useEffect( () => {
      getAllCompeitions()
  }, [])
  
   //get for all competitions
   const getAllCompeitions = async () => {
   //   setRefreshing(true)
     console.log("getting data")
     const allCompetitions = await getAwp()
     setAwp(allCompetitions)
     console.log(allCompetitions)
   //   setRefreshing(false)
   }

   const addNew = () => {
      navigation.navigate("Enter")
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AWP competition entries</Text>

      <TouchableOpacity style={styles.add} onPress={addNew}>
            <Ionicons name="add-circle-outline" size={50} color="#A12895" />
      </TouchableOpacity>

<ScrollView>
{awp.map((Competition, index) => (
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

export default SniperScreen

const styles = StyleSheet.create({
   add: {
      zIndex: 900
   },
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