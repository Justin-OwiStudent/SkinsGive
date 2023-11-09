import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CompetitionCards from '../components/CompetitionCards'
import { useFocusEffect } from '@react-navigation/native'
import { getAllCompetitionsFromCollection, getAllComps, getAwp } from '../services/firebasedb'
import { getAllSkins } from '../services/firebasedb'
import Ionicons from '@expo/vector-icons/Ionicons';
import Competitions from '../components/Competitions'
import { getCurrentUser } from '../services/firebaseAuth'
import { LinearGradient } from 'expo-linear-gradient';


const MainScreen = ({ navigation }) => {
   const [refreshing, setRefreshing] = useState(false)
   const [competitions, setCompetitions] = useState([])
   // const [countdown, setCountdown] = useState([])



   // get data first time viewing screen
   useEffect(() => {
      getAllCompeitions()
   }, [])

   //get for all competitions
   const getAllCompeitions = async () => {
      setRefreshing(true);
      const allCompetitions = await getAllComps();
      setCompetitions(allCompetitions);
    
      // Check if competitions is an array and has at least one element
      if (Array.isArray(allCompetitions) && allCompetitions.length > 0) {
        // Access the EndDate of the first competition
        const firstCompetitionEndDate = allCompetitions[0]?.EndDate;
    
        // Check if EndDate is defined before logging
        if (firstCompetitionEndDate !== undefined) {
          console.log(firstCompetitionEndDate);
        } else {
          console.log('EndDate is undefined');
        }
      } else {
        console.log('Competitions is not an array or is empty');
      }
    
      setRefreshing(false);
    };
   // console.log(competitions.time)
   // const remainingTime = competitions.time


   //    // const width = Dimensions.get("window").width;
   //   const unixTimestamp = remainingTime;

   //   const [countdown, setCountdown] = useState({
   //     days: 0,
   //     hours: 0,
   //     minutes: 0,
   //     seconds: 0,
   //   });
   //   const [ loadEnd, setLoadEnd] = useState(false)

   //   const {days, hours, minutes, seconds} = countdown

   //   const onLoadEnd = () => {
   //     setLoadEnd(prev => !prev);
   //   }


   //   useEffect(() => {
   //     const calculateTimeDifference = () => {
   //       let currentDate = new Date();
   //       let timestampDate = new Date(unixTimestamp * 1000);
   //       let timeDifference = Math.floor((timestampDate - currentDate) / 1000);

   //       let days = Math.floor(timeDifference / (24 * 60 * 60));
   //       let hours = Math.floor((timeDifference / (60 * 60)) % 24);
   //       let minutes = Math.floor((timeDifference / 60) % 60);
   //       let seconds = Math.floor(timeDifference % 60);
   //       days < 0 ? (days = 0) : days < 10 ? (days = "0" + days) : days;
   //       hours < 0 ? (hours = 0) : hours < 10 ? (hours = "0" + hours) : hours;
   //       minutes < 0
   //         ? (minutes = 0)
   //         : minutes < 10
   //         ? (minutes = "0" + minutes)
   //         : minutes;
   //       seconds < 0
   //         ? (seconds = 0)
   //         : seconds < 10
   //         ? (seconds = "0" + seconds)
   //         : seconds;
   //       setCountdown({
   //         days,
   //         hours,
   //         minutes,
   //         seconds,
   //       });
   //     };

   //     const timer = setInterval(calculateTimeDifference, 1000);
   //     calculateTimeDifference(); // Initial calculation to set the countdown immediately

   //     return () => clearInterval(timer);
   //   }, []);




   return (
      <View style={styles.container}>
         <ScrollView style={styles.scroll} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getAllCompeitions} />
         }>

            <View style={styles.bar} >
               <Image style={styles.logo} source={require("../assets/PROFILEPICTURE.png")} />

            </View>

            {/* <Text style={styles.title}> COUNTER SKINS </Text> */}
            <Text style={styles.Ongoing}> ONGOING COMPETITIONS </Text>

            {/* {competitions.map((competition, index) => (
                    <TouchableOpacity style={styles.Comp} onPress={() => navigation.navigate("AWP")} activeOpacity={1}>
                    <Image style={styles.image} source={require("../assets/Awp.png")} />
                    <Text style={styles.CompName}>{competition.id} Competition</Text>
                    <View style={styles.timer}>
                       <Text style={styles.time}> 00:00:00 </Text>
                    </View>
                 </TouchableOpacity>
                ))} */}

<TouchableOpacity style={styles.CompCard} onPress={() => navigation.navigate('AWP')}>
      <LinearGradient
        colors={['transparent', '#3A3F4A']}
        style={styles.gradient}
      />
      <Image style={styles.image} source={require('../assets/Awp.png')} />
      <View style={styles.CompTitleBox}>
         <Text style={styles.GunName}>AWP </Text>
         <Text style={styles.CompetitionName}>Competition</Text>

      </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.CompCard} onPress={() => navigation.navigate('M4')}>
      <LinearGradient
        colors={['transparent', '#3A3F4A']}
        style={styles.gradient}
      />
      <Image style={styles.image} source={require('../assets/M4.png')} />
      <View style={styles.CompTitleBox}>
         <Text style={styles.GunName}>M4A4 </Text>
         <Text style={styles.CompetitionName}>Competition</Text>

      </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.CompCard} onPress={() => navigation.navigate('AWP')}>
      <LinearGradient
        colors={['transparent', '#3A3F4A']}
        style={styles.gradient}
      />
      <Image style={styles.image} source={require("../assets/AK.png")} />
      <View style={styles.CompTitleBox}>
         <Text style={styles.GunName}>AK-47 </Text>
         <Text style={styles.CompetitionName}>Competition</Text>

      </View>
    </TouchableOpacity>
            

            {/* <TouchableOpacity style={styles.Comp} onPress={() => navigation.navigate('AWP')} activeOpacity={1}>
               <Image style={styles.image} source={require('../assets/Awp.png')} />
               <View style={styles.timer}>
                  <Text style={styles.time}>AWP Competition</Text>
               </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.Comp} onPress={() => navigation.navigate("M4")} activeOpacity={1}>
               <Image style={styles.image} source={require("../assets/M4.png")} />
               <View style={styles.timer}>
                  <Text style={styles.time}> M4A4 Competition   </Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Comp} onPress={() => navigation.navigate("AK")} activeOpacity={1}>
               <Image style={styles.image} source={require("../assets/AK.png")} />
               <View style={styles.timer}>
                  <Text style={styles.time}> AK-47 Competition   </Text>
               </View>
            </TouchableOpacity> */}

         </ScrollView>

      </View>
   )
}

export default MainScreen

const styles = StyleSheet.create({
   Comp: {
      width: "90%",
      height: 130,
      // backgroundColor: "#A12895",
      backgroundColor: "#D32026",
      alignSelf: "center",
      marginTop: 20,
      borderRadius: 20
   },
   container: {
      padding: 15,
      backgroundColor: "#20232A"
   },
 
   bar: {
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: '#ffff',
      alignSelf: 'center',
      marginBottom: 15,
      marginTop: 25,
      resizeMode: 'contain',
      borderWidth: 2,
      borderColor: '#D32026',
   },
   logo: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover'

   },
   title: {
      textAlign: 'center',
      fontSize: 18,
      color: 'white',
      marginBottom: 5,

   },
   title2: {
      textAlign: 'center',
      fontSize: 18,
      color: 'white',
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
   
   CompName: {
      textAlign: "center",
      color: "black"
   },
   timer: {

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
 



   // CompCard: {
   //    width: "95%",
   //    height: 250,
   //    backgroundColor: "#2B2F38",
   //    alignSelf: "center"
   // },
   // gradient: {
   //    flex: 1,
   //    justifyContent: 'flex-end',
   //    borderRadius: 20
   // },

   Ongoing: {
      // fontFamily: 'Montserrat-Regular',
      fontSize: 15,
      color: "#AEB3B9",
      textAlign: 'center',
      marginBottom: 20
   },
   CompCard: {
      width: "100%",
      height: 150,
      backgroundColor: '#2B2F38',
      position: 'relative', // Make sure the position is relative
      alignSelf: "center",
      borderRadius: 10,
      marginBottom: 20

    },
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 10
    },
    image: {
      width: 300,
      height: 100,
      padding: 20,
      resizeMode: "contain",
      // backgroundColor: "#A12895",
      alignSelf: "center",
      marginTop: 10,
      borderRadius: 10
      // #2E3034
      // #A12895
   },
    CompTitleBox: {
      width: 200,
      height: 30,
      // backgroundColor:"red",
      alignSelf: "center",
      // marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:"center"
    },
    GunName: {
      fontFamily: 'MontserratBold',
      fontSize: 20,
      color: "#AEB3B9"
    },
    CompetitionName: {
      fontFamily: 'MontserratRegular',
      fontSize: 20,
      color: "#AEB3B9"


    }


})

//TODO: make colours a global style 
//TODO: make the navbar a global style (do research on navbar)
