import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllSkins } from '../services/firebasedb'
import CompetitionCards from '../components/CompetitionCards'

const CompetitionDetailsScreen = ({ route, navigation }) => {

    const [skins, setSkins] = useState([])
//  const [refreshing, setRefreshing] = useState(false)



    const { Competition } = route.params;
    console.log(Competition)
    
    // useEffect(() => {

    // })

    // useEffect(async () => {
    //     await getAllCompeitions()
    //  }, [])
     
    //   //get for all competitions
    //   const getAllCompeitions = async () => {
    //     setRefreshing(true)
    //     console.log("getting data")
    //     const allCompetitions = await getAWPSkins()
    //     setCompetitions(allCompetitions)
    //     console.log(allCompetitions)
    //     setRefreshing(false)
    //   }

      useEffect( () => {
        getSkins()
     }, [])
     
      const getSkins = async () => {
        // setRefreshing(true)
        console.log("getting data")
        const allSkins = await getAllSkins()
        setSkins(allSkins)
        console.log(allSkins)
        // setRefreshing(false)
      }
     

    // {competitions.map((Competition, index) => (
    //     <TouchableOpacity key={index}
    //        onPress={() => navigation.navigate("Details", { Competition })}
    //        activeOpacity={0.75}>
    //        <Competitions data={Competition} />
    //     </TouchableOpacity>

    //  ))}

    return (
        <View style={styles.container}>
         <Text style={styles.title}> Ongoing Competitions </Text>

            {/* <View style={styles.entries}>
                <Text style={styles.entryOne}></Text>
            </View>

            <View style={styles.entries}>
                <Text style={styles.entryOne}></Text>
            </View>

            <View style={styles.entries}>
                <Text style={styles.entryOne}></Text>
            </View> */}

<ScrollView>
{skins.map((skins, index) => (
               <TouchableOpacity key={index}
                  activeOpacity={0.75}>
                  <CompetitionCards data={skins} />
               </TouchableOpacity>

            ))}
</ScrollView>
            

        </View>
    )
}

export default CompetitionDetailsScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    entries: {
        width: '80%',
        height: 100,
        backgroundColor: '#393B3F',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 20
    },
    entryOne: {
        color: 'white',
        textAlign: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        color: '#A12895',
        marginBottom: 15,
  
     },
})