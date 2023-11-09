import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAKImage, getAwpImage, getM4Image, updateScore } from '../services/firebasedb';

const AKCard = (props) => {
    const [image, setImage] = useState("../assets/M4.png");

    const [skins, setSkins] = useState([])

    const { data } = props
    // console.log(data)

    useEffect(() => {
        // ChooseImage()
        getCurrentImage()
    }, [])



    const getCurrentImage = async () => {
        const result = await getAKImage(CompId)
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

    const CompId = data.id;
    console.log(CompId)




    //TODO: count the amount of entries and show on card

    //TODO: do the timestamp

    // const image = 

    return (
        <View style={styles.card}>
           
            <View style={styles.skinSection}>
            { skins != [] ? (
                    <View>
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
                {/* <ScrollView>
            {features.map((feature, index) => (
                <View key={index}>
                <View/>
                ))}
            </ScrollView> */}
                {/* <View>
                {features.map((feature, index) => (
                <View key={index}>
                <View/>
                ))}
            </View> */}
               







                {/* <Image style={styles.skin} source={require(howl)}/> */}



                {/* <Text style={styles.skinName}> {data.name}</Text> */}
            </View>
            <View style={styles.timer}>
                <Text style={styles.time}>{data.name}</Text>
            </View>
           
            <View style={styles.enties}>


                {/* <View style={styles.voting}> 
<           TouchableOpacity  onPress={upscore}>
                <Ionicons name="arrow-up-circle-outline" size={35} color="green" />
            </TouchableOpacity>

            <TouchableOpacity onPress={downScore} >
                <Ionicons name="arrow-down-circle-outline" size={35} color="red" />
            </TouchableOpacity>
</View> */}


                <Text style={styles.scoreText}>Score: {data.score} </Text>

                {/* <Text style={styles.entriesText}> Entries: {data.Entries}</Text> */}

                {/* <TouchableOpacity style={styles.btn} activeOpacity={0.75}  onPress={addNew}  >
                <Text style={styles.enterText}> Enter Competition</Text>
            </TouchableOpacity> */}

            </View>
        </View>
  )
}

export default AKCard

const styles = StyleSheet.create({
    card: {
        width: 350,
        height: 250,
        backgroundColor: '#2E3034',
        marginTop: 25,
        borderRadius: 25
    },
    timer: {
        width: 200,
        height: 30,
        backgroundColor: '#D32026',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 20,
        padding: 6
    },
    time: {
        textAlign: 'center',
        color: 'white'

    },
    skinSection: {
        width: 275,
        height: 155,
        // backgroundColor: '#393B3F',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 20,
        border: 5
    },
    skin: {
        height: 150,
        width: 300,
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
        marginTop: 10
    },
    scoreText: {
        color: "white",
        marginTop: 0,
        position: "absolute",
        right: 20,
        top: 10
    },
    voting: {
        flexDirection: "row",
        position: "absolute",
        top: 20
    },
    IMAGE: {
        borderRadius: 10,
        marginTop: 8,
        width: 240,
        height: 140,
        alignSelf: 'center',
    }
})