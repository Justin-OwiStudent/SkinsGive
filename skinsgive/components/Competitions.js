import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAwpImage, getM4Image, updateScore } from '../services/firebasedb';
import { LinearGradient } from 'expo-linear-gradient';

const Competitions = (props, { navigation }) => {

    const [image, setImage] = useState("../assets/M4.png");

    const [skins, setSkins] = useState([])

    const { data } = props
    const CompId = data.id;
    console.log(CompId)
    // console.log(data)

    useEffect(() => {
        ChooseImage()
        getCurrentImage()
    }, [])



    const getCurrentImage = async () => {
        const result = await getAwpImage(CompId)
        console.log(result)
        setSkins(result)
    }

    const ChooseImage = () => {
        if (data.value === "AWP") {
            setImage("../assets/Awp.png")
        } else if (data.value === "M4A4") {
            setImage("../assets/M4.png")
        } else if (data.value === "AK-47") {
            setImage("../assets/AK.png")

        }
    }
    console.log(image)

    const howl = "../assets/M4.png"

    




    //TODO: count the amount of entries and show on card

    //TODO: do the timestamp

    // const image = 

    return (
        <View style={styles.card}>
             <LinearGradient
        colors={['transparent', '#3A3F4A']}
        style={styles.gradient}
      />

                { skins != [] ? (
                    <View style={styles.ImageSection}>
                        
                       
                        {skins.map((skin, index) => (
                            <View key={index}>
                                <Image style={styles.IMAGE}
                                    source={{ uri: skin.imageUrl }}
                                // style={{height: 140, width: 190}}
                                />
                            </View>
                        ))}
                    </View>
                ) : (<Text>No Image Added !</Text>) }

            <View style={styles.Details}>
            <Text style={styles.title}>{data.name}</Text>
            </View>
            <View style={styles.Created}>
            <Text style={styles.Creator}>Creator: </Text>
            <Text style={styles.CreatorName}>{data.creator}</Text>

            </View>
            
            {/* <View style={styles.skinSection}>
           
                

            </View> */}
            {/* <View style={styles.Details}>

            </View> */}
            
            {/* <View style={styles.NameBadge}>
                <Text style={styles.time}>{data.name}</Text>
            </View>
            <View style={styles.enties}>
                <Text style={styles.scoreText}>Score: {data.score} </Text>
            </View> */}
        </View>
    )
}

export default Competitions

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: 350,
        height: 250,
        backgroundColor: '#2B2F38',
        border: "black",
        marginTop: 25,
        borderRadius: 5,
        // alignItems: "center"
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '35%',
        borderRadius: 10
      },
    ImageSection: {
        width: 350,
        height: 170,
        // backgroundColor: "blue",
        // marginTop: 20
    },
    IMAGE: {
        borderRadius: 5,
        // marginTop: 8,
        // backgroundColor: "red",
        width: 350,
        height: 170,
        alignSelf: 'center',
    },
    Details: {
        width: 300,
        height: 40,
        // backgroundColor: "red",
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 5,
        position: "relative",
        // alignItems: "center",
        justifyContent: "center"
    },
    title: {
        // textAlign: 'center',
        color: '#AEB3B9',
        fontSize: 25,
        fontFamily: 'MontserratBold',


    },
    Created: {
        flexDirection: "row",
        marginLeft: 10,
        

    },
    Creator: {
        color: '#FED32C',
        fontFamily: 'MontserratBold',
        fontSize: 16
    },
    CreatorName:{
        fontFamily: 'MontserratRegular',
        color: '#AEB3B9',
        fontSize: 16

    },


    ScoreBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#D32026",
        position: "absolute",
        // right: 0,
        left: -10,
        top: -20,
        justifyContent: "center",
        alignItems: "center"
    },
   
    scoreText: {
        color: "white",
        fontSize: 20
        // marginTop: 0,
        // position: "absolute",
        // right: -20,
        // top: 10
    },
    skinSection: {
        width: 275,
        height: 155,
        // backgroundColor: '#393B3F',
        // alignSelf: 'center',
        // alignItems: "center",
        marginTop: 10,
        borderRadius: 10,
        border: 5
    },
    
   
   
    NameBadge: {
        width: 200,
        height: 30,
        backgroundColor: '#D32026',
        alignSelf: 'center',
        // marginTop: 10,
        borderRadius: 20,
        padding: 6
    },
   
  
    skin: {
        height: 150,
        width: 100,
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 10,
        resizeMode: 'contain',
        // backgroundColor: "red"
    },
    skinName: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20
        // textDecorationLine: 'underline'
    },
    enties: {
        width: 300,
        height: 5,
        flexDirection: "row",
        // backgroundColor: 'red',
        alignSelf: 'center',
        marginTop: 10
    },
    entriesText: {
        fontSize: 12,
        marginTop: 15,
        color: 'white',
        alignSelf: 'flex-start'
    },
    btn: {
        width: 150,
        height: 40,
        marginTop: 5,
        marginRight: 5,
        borderRadius: 25,
        backgroundColor: 'white',
        position: 'absolute',
        right: 0
    },
    enterText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20
    },
   
    voting: {
        flexDirection: "row",
        position: "absolute",
        top: 20
    },
   
})