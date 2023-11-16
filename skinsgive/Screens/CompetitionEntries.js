import { ScrollView, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getEntriesForCompetition } from '../services/firebasedb';
import Competitions from '../components/Competitions';
import { withNavigation } from '@react-navigation/native';


const CompetitionEntries = ({ route }) => {
    const navigation = useNavigation();
    const { competition } = route.params;

    const competitionId = competition.id
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
          try {
            const entriesData = await getEntriesForCompetition(competitionId);
            setEntries(entriesData);
            console.log('Entries:', entriesData);
          } catch (error) {
            console.error('Error fetching entries:', error);
          }
        };
    
        fetchEntries();
      }, [competitionId]);


      const navigateToCompDetails = (Competition) => {
        navigation.navigate('CompDetails', { competitionId: competitionId, Competition });
      };
   
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
       <TouchableOpacity style={styles.add} onPress={addNew} >
          <Ionicons name="add-circle-outline" size={30} color="#FED32C" />
       </TouchableOpacity>

    </View>

    <ScrollView >
       {entries.map((Competition, index) => (
          <TouchableOpacity key={index}
          onPress={() => navigateToCompDetails(Competition)}
          activeOpacity={0.75}>
             <Competitions data={Competition} competitionId={competitionId}/>
          </TouchableOpacity>
       ))}
    </ScrollView>
 </View>
  )
}

export default CompetitionEntries

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