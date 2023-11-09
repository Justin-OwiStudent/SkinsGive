import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CompetitionCards from '../components/CompetitionCards'
import { useFocusEffect } from '@react-navigation/native'
import { getAllCompetitionsFromCollection, getAllComps, getAwp, getEntriesForCompetition, getEntriesForWinnigCompetition, getUserDoc, updateUserWins } from '../services/firebasedb'
import { getAllSkins } from '../services/firebasedb'
import Ionicons from '@expo/vector-icons/Ionicons';
import Competitions from '../components/Competitions'
import { getCurrentUser } from '../services/firebaseAuth'
import { LinearGradient } from 'expo-linear-gradient';




const MainScreen = ({ navigation }) => {
   const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0 });
   const [refreshing, setRefreshing] = useState(false)
   const [competitions, setCompetitions] = useState([]);
   const [winningEntries, setWinningEntries] = useState({});
   const [winner, setWinner] = useState("");
   // const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(competition.EndDate));

   const user = getCurrentUser()
   // console.log(user.uid)

   useEffect(() => {
      getAllCompetitions();
   }, []);

   // get for all competitions
   const getAllCompetitions = async () => {
      setRefreshing(true);
      try {
         const allCompetitions = await getAllComps();
         setCompetitions(allCompetitions);

         if (Array.isArray(allCompetitions) && allCompetitions.length > 0) {
            const competitionsWithTimeRemaining = await Promise.all(
               allCompetitions.map(async (outerCompetition) => {
                  const outerCompId = outerCompetition.id;
                  const competitionEndDate = outerCompetition?.EndDate;
                  const timeRemaining = calculateTimeRemaining(competitionEndDate);

                  const winningEntries = timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0
                     ? await getEntriesForWinnigCompetition(outerCompId)
                     : null;

                  const winningEntry = calculateWinningEntry(winningEntries);
                  setWinner(winningEntry?.creator)
                  
                  // updateWins();

                  return {
                     ...outerCompetition,
                     timeRemaining: calculateTimeRemainingString(competitionEndDate),
                     winningEntry: winningEntry,
                  };
               })
            );

            setWinningEntries(competitionsWithTimeRemaining.reduce((acc, competition) => {
               acc[competition.id] = competition.winningEntry;
               return acc;
            }, {}));

         } else {
            console.log('Competitions is not an array or is empty');
         }
      } catch (error) {
         console.error('Error fetching competitions:', error);
      }

      setRefreshing(false);
   };

   // const updateWins = async () => {
   //    try {
   //      // Check if the winner is the current user
   //      if (winner === user.displayName) {
         
   //        const userId = user.id
   //        const userDoc = await getUserDoc(userId);
    
   //        // Update the "wins" field
   //        await updateUserWins(userDoc.id, userDoc.wins + 1);
   //      }
   //    } catch (error) {
   //      console.error('Error updating wins:', error);
   //    }
   //  };


   const calculateWinningEntry = (entries) => {
      if (!Array.isArray(entries)) {
         return null;
      }

      let winningEntry = null;
      let maxScore = -1;

      entries.forEach((entry) => {
         if (entry.score > maxScore) {
            maxScore = entry.score;
            winningEntry = entry;
         }
      });

      return winningEntry;
   };

   const calculateTimeRemaining = (endDate) => {
      const now = new Date();
      const end = new Date(endDate.seconds * 1000); 

      const timeDifference = end - now;

      if (timeDifference <= 0) {
         return { days: 0, hours: 0, minutes: 0 };
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

      return { days, hours, minutes };
   };

   const calculateTimeRemainingString = (endDate) => {
      const timeRemaining = calculateTimeRemaining(endDate);
      const { days, hours, minutes } = timeRemaining;

      // Format the string as per your preference
      return `${days} days, ${hours} hours, ${minutes} minutes remaining`;
   };


   const navigateToEntries = (competition) => {
  
      navigation.navigate('CompEntries', { competition });
   };


   const getCompetitionImage = (competitionId) => {
      switch (competitionId) {
        case 'AK-47':
          return require("../assets/AK.png");
        case 'AWP':
          return require('../assets/Awp.png');
        case 'M4A4':
          return require('../assets/M4.png');
       
        default:
          return require('../assets/Awp.png');
      }
    };


   return (
      <View style={styles.container}>
         <ScrollView style={styles.scroll} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getAllCompetitions} />
         }>

            <View style={styles.bar} >
               <Image style={styles.logo} source={require("../assets/PROFILEPICTURE.png")} />

            </View>


            <Text style={styles.Ongoing}> ONGOING COMPETITIONS </Text>

            {competitions.map((competition, index) => (
               <TouchableOpacity style={styles.CompCard} key={index}
                  onPress={() => navigateToEntries(competition)}
                  activeOpacity={0.75}>
                  <LinearGradient
                     colors={['transparent', '#3A3F4A']}
                     style={styles.gradient}
                  />

                  {winningEntries[competition.id] ? (
                     <View style={styles.WinnerBox}>
                        <Text style={styles.winningEntryCreator}>
                           {winningEntries[competition.id].creator}
                        </Text>
                        <Text style={styles.winningEntryText}>
                           Winner
                        </Text>
                     </View>

                  ) : (
                     <>

                        <Image style={styles.image} source={getCompetitionImage(competition.id)} />
                        <View style={styles.CompTitleBox}>
                           <Text style={styles.GunName}>{competition.id} </Text>
                           <Text style={styles.CompetitionName}>Competition</Text>
                        </View>
                        <Text style={styles.timeRemaining}>
                           {calculateTimeRemainingString(competition.EndDate)}
                        </Text>
                     </>
                  )}
               </TouchableOpacity>
            ))}


            {/* {competitions.map((competition, index) => (
              
                  <TouchableOpacity style={styles.CompCard}  key={index}
                  onPress={() => navigateToEntries(competition)}
                  activeOpacity={0.75}>
                     <LinearGradient
                        colors={['transparent', '#3A3F4A']}
                        style={styles.gradient}
                     />
                      <Text style={styles.timeRemaining}>
                      {calculateTimeRemainingString(competition.EndDate)}
                     </Text>
                     <Image style={styles.image} source={require('../assets/Awp.png')} />
                     <View style={styles.CompTitleBox}>
                        <Text style={styles.GunName}>{competition.id} </Text>
                        <Text style={styles.CompetitionName}>Competition</Text>

                     </View>
                  </TouchableOpacity>
               
            ))} */}

            {/* <TouchableOpacity style={styles.CompCard} onPress={() => navigation.navigate('AWP')}>
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
            </TouchableOpacity> */}




         </ScrollView>

      </View>
   )
}

export default MainScreen

const styles = StyleSheet.create({

   container: {
      padding: 15,
      backgroundColor: "#20232A",
      paddingBottom: 100
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

   scroll: {
      width: '100%',
      height: '110%',
      marginTop: 20,
      borderRadius: 20
   },




   timeRemaining: {
      // backgroundColor: "red",
      height: 20,
      width: 300,
      alignSelf: "center",
      textAlign: "center",
      fontFamily: 'MontserratRegular',
      color: "#AEB3B9",
      fontSize: 10,
      marginTop: 10

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
      height: 170,
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
   WinnerBox: {
      width: "50%",
      height: 170,
      // backgroundColor: "red",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center"
   },
   winningEntryCreator: {
      fontFamily: 'MontserratRegular',
      fontSize: 20,
      marginBottom: 10,
      color: "#AEB3B9"

   },
   winningEntryText: {
      fontFamily: 'MontserratBold',
      fontSize: 30,
      color: "#FED32C"
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
      justifyContent: "center"
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
