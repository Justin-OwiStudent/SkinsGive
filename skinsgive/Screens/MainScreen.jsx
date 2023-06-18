import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CompetitionCards from '../components/CompetitionCards'
import { useFocusEffect } from '@react-navigation/native'
import { getAllCompetitionsFromCollection, getAwp } from '../services/firebasedb'
import { getAllSkins } from '../services/firebasedb'
import Ionicons from '@expo/vector-icons/Ionicons';
import Competitions from '../components/Competitions'
import { getCurrentUser } from '../services/firebaseAuth'
getAllSkins

const MainScreen = ({ navigation }) => {
   const [refreshing, setRefreshing] = useState(false)

   const [competitions, setCompetitions] = useState([])
   //  const [path, setPath] = useState([])



   // get data first time viewing screen
   useEffect(() => {
      getAllCompeitions()
   }, [])

   //get for all competitions
   const getAllCompeitions = async () => {
      setRefreshing(true)
      console.log("getting data")
      const allCompetitions = await getAwp()
      setCompetitions(allCompetitions)
      console.log("got data")
      setRefreshing(false)
   }

   // const addNew = () => {
   //    navigation.navigate("Enter")
   // }


   return (
      <View style={styles.container}>
         <ScrollView style={styles.scroll} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getAllCompeitions} />
         }>

            <View style={styles.bar} >
               <Image style={styles.logo} source={require("../assets/CompLogo.png")} />

            </View>

            <Text style={styles.title}> Ongoing Competitions </Text>

            {/* <TouchableOpacity style={styles.add} onPress={addNew}>
            <Ionicons name="add-circle-outline" size={50} color="#A12895" />
         </TouchableOpacity> */}


            {/* {competitions.map((Competition, index) => (
               <TouchableOpacity key={index}
                  onPress={() => navigation.navigate("Details", { Competition })}
                  activeOpacity={0.75}>
                  <Competitions data={Competition} />
               </TouchableOpacity>
            ))} */}



            <TouchableOpacity style={styles.Comp} onPress={() => navigation.navigate("AWP")} activeOpacity={1}>
               <Image style={styles.image} source={require("../assets/Awp.png")} />
               <Text style={styles.CompName}>AWP Competition</Text>
               <View style={styles.timer}>
                  <Text style={styles.time}> 00:00:00 </Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Comp} onPress={() => navigation.navigate("M4")} activeOpacity={1}>
               <Image style={styles.image} source={require("../assets/M4.png")} />
               <Text style={styles.CompName}>M4A4 Competition</Text>
               <View style={styles.timer}>
                  <Text style={styles.time}> 00:00:00 </Text>
               </View>

            </TouchableOpacity>

            <TouchableOpacity style={styles.Comp} onPress={() => navigation.navigate("AK")} activeOpacity={1}>
               <Image style={styles.image} source={require("../assets/AK.png")} />
               <Text style={styles.CompName}>AK-47 Competition</Text>
               <View style={styles.timer}>
                  <Text style={styles.time}> 00:00:00 </Text>
               </View>
            </TouchableOpacity>


            {/* <View style={styles.Comp}>

            </View> */}




         </ScrollView>




         {/* <View style={styles.navBar}> 
      <Image style={styles.navIcon} source={require("../assets/CompLogo.png")}/>
      <Image style={styles.navIcon} source={require("../assets/CompLogo.png")}/>
      <Image style={styles.navIcon} source={require("../assets/CompLogo.png")}/>

    </View> */}
      </View>
   )
}

export default MainScreen

const styles = StyleSheet.create({
   Comp: {
      width: "90%",
      height: 130,
      backgroundColor: "#A12895",
      alignSelf: "center",
      marginTop: 20,
      borderRadius: 20
   },
   container: {
      padding: 20,
      backgroundColor: "#202226"
   },
   bar: {
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: '#393B3F',
      alignSelf: 'center',
      marginBottom: 15,
      marginTop: 25,
      resizeMode: 'contain',
      borderWidth: 1,
      borderColor: '#A12895',
   },
   logo: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover'

   },
   title: {
      textAlign: 'center',
      fontSize: 18,
      color: '#A12895',
      marginBottom: 30,

   },
   scroll: {
      width: '100%',
      height: '110%',
      marginTop: 20,
      borderRadius: 20
   },
   navBar: {
      width: 300,
      height: 60,
      backgroundColor: '#393B3F',
      marginBottom: 1,
      alignSelf: 'center',
      borderRadius: 25,
      zIndex: 999,
      flexDirection: 'row',
      paddingLeft: 25,
      marginTop: 5,

   },
   navIcon: {
      width: 60,
      height: 60,
      marginRight: 35
   },
   add: {
      width: 50,
      height: 50,
      // borderRadius: 30,
      // borderWidth: 2,
      // borderColor: "black",
      // backgroundColor: "#A12895"
   },
   image: {
      width: 250,
      height: 70,
      padding: 20,
      resizeMode: "contain",
      backgroundColor: "#A12895",
      alignSelf: "center",
      marginTop: 5,
      borderRadius: 10
      // #2E3034
      // #A12895
   },
   CompName: {
      textAlign: "center",
      color: "black"
   },
   timer: {
      width: 100,
      height: 25,
      backgroundColor: '#2E3034',
      alignSelf: 'center',
      marginTop: 10,
      borderRadius: 20,
      padding: 5
   },
   time: {
      textAlign: 'center',
      color: 'white'
   },
})

//TODO: make colours a global style 
//TODO: make the navbar a global style (do research on navbar)
