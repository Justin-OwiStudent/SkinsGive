import { ScrollView, StyleSheet, Text, View,TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Competitions from '../components/Competitions';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { UpdateSkinScore, getCompetitionImage, getSkinEntry } from '../services/firebasedb';
import { LinearGradient } from 'expo-linear-gradient';



const CompetitionDetails = ({ route }) => {
    const navigation = useNavigation();
    const { competitionId, Competition } = route.params;
    const CompId = Competition.id
    const [skinImage, setSkinImage] = useState([]);
    const [score, setScore] = useState(Competition.score); // Initialize the score state
    const [Views, setViews] = useState(Competition.views);

    useEffect(() => {
        getCurrentImage();
        getViews();
      }, []);
    
      

      const getViews = async () => {
        try {
          const skinEntry = await getSkinEntry(competitionId, CompId); // Add 'await' here
          if (skinEntry) {
            // Display the skin details
            console.log("Skin Details:", skinEntry);
            setViews(skinEntry.views)
          } else {
            console.log("Skin not found.");
          }
        } catch (error) {
          console.error("Error getting views", error);
        }
      };
      

      const getCurrentImage = async () => {
        try {
          const result = await getCompetitionImage(competitionId, CompId);
          setSkinImage(result);
        } catch (error) {
          console.error('Error fetching skin image:', error);
        }
      };
    
      const back = () => {
        navigation.goBack();
      };
    
      const getSkinDescription = (skinValue) => {
        switch (skinValue) {
          case 'AWP':
            return 'This is an AWP skin. Description for AWP goes here.';
          case 'M4A4':
            return 'This is an M4A4 skin. Description for M4A4 goes here.';
          case 'AK-47':
            return 'This is an AK-47 skin. Description for AK-47 goes here.';
          default:
            return 'Unknown skin type. No description available.';
        }
      };
    
      const updateScoreAndUI = async () => {
        await UpdateSkinScore(competitionId, CompId);
        setScore((prevScore) => prevScore + 1); // Increment the score in the local state
        Alert.alert('You voted for: ', Competition.name);
      };


  return (
    <View style={styles.container}>
            <View style={styles.TopSection}>
            <LinearGradient
                    colors={['transparent', '#20232A']}
                    style={styles.gradient}
                />
                
            <TouchableOpacity onPress={back} style={styles.back}>  
                <Ionicons name="chevron-back-outline" size={30} color="#FED32C" />
            </TouchableOpacity>
                
                    {skinImage.map((image, index) => (
                        <View key={index} style={styles.imageHere}>
                            
                            <Image style={styles.IMAGE}
                                source={{ uri: image.imageUrl }}
                                resizeMode="contain"


                            />
                            <LinearGradient
                    colors={['transparent', '#20232A']}
                    style={styles.gradient}
                />
                        </View>
                    ))}            
            </View>

            <View style={styles.DetailSection}>
                    <Text style={styles.SkinTitle}> {Competition.name} </Text>

                    <View style={styles.RifleSection}>
                        <Text style={styles.classTitle}>Rifle: </Text>
                        <Text style={styles.classValue}>{Competition.value}</Text>
                    </View>

                    <View style={styles.RifleSection2}>
                        <Text style={styles.classTitle}>Exterior: </Text>
                        <Text style={styles.classValue}>{Competition.exterior}</Text>
                    </View>

                    <View style={styles.RifleSection2}>
                        <Text style={styles.classValue}>{getSkinDescription(Competition.value)}</Text>
                        
                    </View>

                    <View style={styles.RifleSection2}>
                        <Text style={styles.classTitle}>Creator: </Text>
                        <Text style={styles.classValue}>{Competition.creator}</Text>
                    </View>
                    <TouchableOpacity style={styles.voteButton} onPress={updateScoreAndUI}>
                        <Text style={styles.voteText}>Vote</Text>
                    </TouchableOpacity>
            </View>

            <View style={styles.VoteViewSection}>
                        <View style={styles.VoteBox}>
                            <Text style={styles.Number}>{score}</Text>
                            <Text style={styles.NumberText}>Votes</Text>

                        </View>
                        <View style={styles.VoteBox}>
                            <Text style={styles.Number}>{Views}</Text>
                            <Text style={styles.NumberText}>Views</Text>
                        </View>
            </View>

        </View>
  )
}

export default CompetitionDetails

const styles = StyleSheet.create({
    container: {
        padding: 0,
        // paddingTop: 50,
        backgroundColor: "#20232A",
        height: "100%"
    },
    TopSection: {
        height: 350,
        width: "110%",
        backgroundColor: "#494D56",
        position: "relative",
        paddingTop: 70
    },
    back: {
        marginLeft: 15,
        position: "absolute",
        top: 70,
        zIndex: 999,
        backgroundColor: "#2B2F38",
        borderRadius: 20,
        width: 40,
        height: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    imageHere: {
        width: "100%",
        height: 350,
        position: "absolute",
        bottom: 0,
        left: 0,
        borderRadius: 5,
    },
    IMAGE: {
        width: "95%",
        height: 350,
        borderRadius: 5,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    DetailSection: {
        width: "90%",
        // height: 320,
        backgroundColor: "#2B2F38",
        alignSelf: "center",
        marginTop: 20,
        borderRadius: 10,
        padding: 10
    },
    SkinTitle: {
        fontSize: 30,
        fontFamily: "MontserratBold",
        color: "#FED32C",
        marginTop: 10
    },
    RifleSection: {
        flexDirection: "row",
        padding: 10
    },
    RifleSection2: {
        flexDirection: "row",
        padding: 10
    },
    classTitle:{
        fontFamily: "MontserratBold",
        color: "#AEB3B9",
        fontSize: 15
    },
    classValue: {
        fontFamily: "MontserratRegular",
        color: "#AEB3B9",
        fontSize: 15
    },
    voteButton: {
        width: "90%",
        height: 40,
        backgroundColor: "#FED32C",
        alignSelf: "center",
        marginTop: 20,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    voteText: {
        fontSize: 16,
        fontFamily: "MontserratRegular",
    },
    VoteViewSection: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        marginTop: 20,
    },
    VoteBox: {
        width: 160,
        height: 90,
        backgroundColor: "#2B2F38",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    Number: {
        fontFamily: "MontserratLight",
        color: "#AEB3B9",
        fontSize: 30
    },
    NumberText: {
        fontFamily: "MontserratBold",
        color: "#FED32C",
    }
})