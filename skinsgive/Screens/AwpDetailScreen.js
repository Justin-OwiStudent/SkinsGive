import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAwpImage, updateAwpScore } from '../services/firebasedb';
import { LinearGradient } from 'expo-linear-gradient';



const AwpDetailScreen = ({ route, navigation }) => {

    const { Competition } = route.params;

    const CompId = Competition.id;


    const [score, setScore] = useState(Competition.score);
    const [scoreUp, setScoreUp] = useState(Competition.score);
    const [skins, setSkins] = useState([]);


    //if currentuser === createduser, cant vote

    useEffect(() => {
        getCurrentImage()
    }, [])

    const getCurrentImage = async () => {
        const result = await getAwpImage(CompId)
        // console.log(result)
        setSkins(result)
    }



    const upscore = () => {
        currentScore = Competition.score += 1;
        setScoreUp(currentScore)
        setScore(scoreUp)
        UpdateTheScore()
    }


    const UpdateTheScore = async () => {
        var CompetitionDetails = {
            score
        };
        await updateAwpScore(CompetitionDetails, CompId).then(() => {
            Alert.alert("You voted for: " + Competition.name);
            navigation.goBack();
        })
    }

    const back = () => {
        navigation.goBack()
    }


    return (
        <View style={styles.container}>
            <View style={styles.TopSection}>
                
            <TouchableOpacity onPress={back} style={styles.back}>  
                <Ionicons name="chevron-back-outline" size={30} color="white" />
            </TouchableOpacity>
                
                    {skins.map((skin, index) => (
                        <View key={index} style={styles.imageHere}>
                            
                            <Image style={styles.IMAGE}
                                source={{ uri: skin.imageUrl }}

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
                        <Text style={styles.classValue}>{Competition.value}</Text>
                    </View>

                    <View style={styles.RifleSection2}>
                        <Text style={styles.classValue}>kjhjweqrkjwherkjwherkjwehrkjwehrkwjehrkwjehrkjwehrkjwherkjwherkjwehrkjwehrkjwherkwjehrkwejrh:</Text>
                        
                    </View>

                    <View style={styles.RifleSection2}>
                        <Text style={styles.classTitle}>Creator: </Text>
                        <Text style={styles.classValue}>{Competition.creator}</Text>
                    </View>
                    <TouchableOpacity style={styles.voteButton}>
                        <Text style={styles.voteText}>Vote</Text>
                    </TouchableOpacity>
            </View>

            <View style={styles.VoteViewSection}>
                        <View style={styles.VoteBox}>
                            <Text style={styles.Number}>100</Text>
                            <Text style={styles.NumberText}>Votes</Text>

                        </View>
                        <View style={styles.VoteBox}>
                            <Text style={styles.Number}>100</Text>
                            <Text style={styles.NumberText}>Views</Text>
                        </View>
            </View>

           

            {/* <View style={styles.imageHere}>

                {skins.map((skin, index) => (
                    <View key={index}>
                        <Image style={styles.IMAGE}
                            source={{ uri: skin.imageUrl }}

                        />
                    </View>
                ))}
                <View style={styles.scoreBox}>
                    <Text style={styles.score}>2</Text>
                </View>

            </View> */}


            

            {/* <Text style={styles.inputLabel}> SKIN NAME</Text>
            <View style={styles.scorehere}>
                <Text style={styles.title}> {Competition.name} </Text>
            </View>

            <Text style={styles.inputLabel}>GUN TYPE</Text>
            <View style={styles.scorehere}>
                <Text style={styles.title}> {Competition.value} </Text>
            </View> */}


            {/* <View style={styles.skinInfo}>
                <Text style={styles.title}> Like the skin? </Text>
                <Text style={styles.title}> Vote for it!</Text>


                <TouchableOpacity onPress={upscore}>
                    <View style={styles.voteHere}>
                        <Text style={styles.voteText}>Vote Here</Text>
                    </View>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

export default AwpDetailScreen

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
        zIndex: 999
    },
    imageHere: {
        width: "100%",
        height: 350,
        backgroundColor: 'red',
        position: "absolute",
        bottom: 0,
        left: 0,
        // marginTop: 20,
        borderRadius: 5,
        // paddingTop: 20,
        // alignItems: 'center',
        
    },
    IMAGE: {
        width: "95%",
        height: 350,
        borderRadius: 5,

        // alignSelf: 'center'
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        // borderRadius: 10
    },
    DetailSection: {
        width: "90%",
        height: 320,
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




    // scoreBox: {
    //     width: 50,
    //     height: 50,
    //     borderRadius: 30,
    //     backgroundColor: "#D32026",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     position: "absolute",
    //     right: -10,
    //     top: -20
    // },
    // score: {
    //     color: "white",
    //     fontSize: 20,
    //     fontWeight: "bold"
    // },
    // Creator: {
    //     fontSize: 15,
    //     marginTop: 5,
    //     // fontWeight: "bold",
    //     color: "white",

    // },
    // SkinName: {
    //     fontSize: 25,
    //     marginTop: 10,
    //     fontWeight: "bold",
    //     color: "white"
    // },
    // SkinType: {
    //     fontSize: 15,
    //     marginTop: 5,
    //     fontWeight: "bold",
    //     color: "white"
    // },


    // inputLabel: {
    //     fontSize: 12,
    //     marginTop: 20,
    //     paddingLeft: 25,
    //     marginBottom: 5,
    //     color: '#D32026'
    // },
    // scorehere: {
    //     width: '80%',
    //     height: 30,
    //     backgroundColor: '#393B3F',
    //     alignSelf: 'center',
    //     marginTop: 0,
    //     borderRadius: 20
    // },
    // skinInfo: {
    //     width: '90%',
    //     height: 180,
    //     backgroundColor: '#393B3F',
    //     alignSelf: 'center',
    //     marginTop: 40,
    //     borderRadius: 20,
    //     paddingTop: 20
    // },
    // info: {
    //     marginTop: 5,
    //     marginLeft: 5,
    //     fontSize: 18,
    //     color: '#D32026',
    //     textAlign: "left"
    // },
    // title: {
    //     textAlign: 'center',
    //     fontSize: 22,
    //     color: 'white',
    //     marginBottom: 0,
    // },
    // infoText: {
    //     fontSize: 15,
    //     color: '#A12895',
    // },
    // voteHere: {
    //     width: "80%",
    //     height: 50,
    //     backgroundColor: "#D32026",
    //     alignSelf: "center",
    //     marginTop: 25,
    //     borderRadius: 15,
    //     padding: 10
    // },
    // voteText: {
    //     color: "white",
    //     textAlign: "center",
    //     fontSize: 25,

    // },


})