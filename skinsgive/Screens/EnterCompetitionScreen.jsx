import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { getCurrentUser } from '../services/firebaseAuth'
import { addAkSkin, addAwpSkin, addCompetitionCollection, addM4Skin } from '../services/firebasedb'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { uploadToStorage } from '../services/firebaseStorage';
import DropDownPicker from 'react-native-dropdown-picker';



const EnterCompetitionScreen = ({ navigation }) => {


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'AWP', value: 'AWP' },
        { label: 'M4A4', value: 'M4A4' },
        { label: 'AK-47', value: 'AK-47' }

    ]);



    const [name, setName] = useState("")
   

    const createEntry = async () => {
        //AWP ADD
        if (value === "AWP") {
            var creatorInfo = getCurrentUser()

            var competition = {
                name,
                value,
                creator: creatorInfo.displayName,
                userId: creatorInfo.uid,
                score: 0
            }

            var skins = []
            image && skins.push({imageUrl: image, name: name})

            const success = await addAwpSkin(competition, skins)
            if (success) {
                console.log("added AWP Skin successfully")
                navigation.goBack()
                
            } else {
                console.log("Whoops... adding Skin failed.")
                Alert.alert("whoops", "something went wrong when trying to add Skin")
            }
        } else if (value === "M4A4") {
            var creatorInfo = getCurrentUser()

            var competition = {
                name,
                value,
                creator: creatorInfo.displayName,
                userId: creatorInfo.uid,
                score: 0
            }
            const success = await addM4Skin(competition)
            if (success) {
                console.log("added M4A4 Skin Successfully")
                navigation.goBack()
                
            } else {
                console.log("Whoops... adding Skin failed.")
                Alert.alert("whoops", "something went wrong when trying to add Skin")
            }
        } else if (value === "AK-47") {
            var creatorInfo = getCurrentUser()

            var competition = {
                name,
                value,
                creator: creatorInfo.displayName,
                userId: creatorInfo.uid,
                score: 0
            }

            const success = await addAkSkin(competition)
            if (success) {
                console.log("added Ak-47 successfully")
                navigation.goBack()
               
            } else {
                console.log("Whoops... adding Skin failed.")
                Alert.alert("whoops", "something went wrong when trying to add Skin")
            }
        }


    }






    //IMAGE PICKER ---
    const [image, setImage] = useState(null)

    

    const pickImageFromLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [6, 4],
            quality: 0.7,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }


    const back = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={back}>
                <Ionicons name="arrow-back-outline" size={50} color="#A12895" />
            </TouchableOpacity>
            <View style={styles.EnterDetails}>
                <Text style={styles.WantEnter}>Want to take part in the M4 competition?</Text>
                <Text style={styles.Followsteps}>Follow these easy steps:</Text>

                <Text style={styles.steps}>
                    1. Enter the full name of skin.
                </Text>
                <Text style={styles.steps}>
                    2. Enter category for given skin.
                </Text>
                <Text style={styles.steps}>
                    3. Enter a clear image of the skin.
                </Text>

                <Text style={styles.SkinNameLabel}>Gun type:</Text>
                <DropDownPicker
                    style={styles.dropdown}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    disableBorderRadius={true}
                />

                <Text style={styles.SkinNameLabel}>Skin name:</Text>
                <TextInput style={styles.SkinName}
                    keyboardType='default'
                    defaultValue={name}
                    onChangeText={(newValue) => setName(newValue)} />

            


                <Text style={styles.SkinUploadLabel}>Select Image:</Text>
                <View style={styles.SkinImage}>
                    {image && <Image source={{ uri: image }} style={{ alignSelf: "center", width: 290, height: 200, marginTop: 5, borderRadius: 20 }} />}
                </View>
          
                <View style={styles.inputGroup}>
                    

                    {image ? (
                        <Pressable onPress={() => setImage(null)}>
                            <Ionicons name="trash-outline" size={32} color="red" />
                        </Pressable>
                    ) : (
                        <>
                            <Pressable style={styles.uploadImgaeButton} onPress={() => pickImageFromLibrary(1)}>
                                <Ionicons name="images-outline" size={32} color="white" />
                            </Pressable>
                            <Pressable onPress={() => { }}>
                                <Ionicons name="camera-outline" size={34} color="white" />
                            </Pressable>
                        </>
                    )}
                </View>



              

                <TouchableOpacity style={styles.upload} onPress={createEntry}>
                    <Text style={styles.Enter}>Enter Comp</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default EnterCompetitionScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#202226",
        height: "100%",
        paddingTop: 50
    },
    EnterDetails: {
        alignSelf: 'flex-start',
        marginTop: 10,

        // backgroundColor: "#A12895",

    },
    WantEnter: {

        color: 'white',
        marginBottom: 20,
        marginLeft: 20
    },
    Followsteps: {
        color: 'white',
        marginBottom: 20,
        marginLeft: 20

    },
    steps: {
        color: 'white',
        textAlign: "left",
        marginLeft: 25

    },

    SkinNameLabel: {
        fontSize: 12,
        marginTop: 20,
        paddingLeft: 30,
        marginBottom: 5,
        color: 'white'
    },
    SkinName: {
        backgroundColor: '#393B3F',
        height: 50,
        width: 300,
        borderRadius: 20,
        color: 'white',
        marginLeft: 30,
        paddingLeft: 15
    },
    SkinUploadLabel: {
        fontSize: 12,
        marginTop: 20,
        paddingLeft: 30,
        marginBottom: 15,
        color: 'white'
    },
    SkinImage: {
        backgroundColor: '#393B3F',
        height: 210,
        width: 300,
        borderRadius: 20,
        color: 'black',
        marginLeft: 30,
        marginBottom: 20
    },
    upload: {
        width: 150,
        height: 50,
        backgroundColor: '#A12895',
        marginLeft: 30,
        marginTop: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "black"
    },
    uploadImgaeButton: {
        marginBottom: 20
    },
    inputGroup: {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-between",
        gap: 15,
        alignItems: "left",
        marginLeft: 50
    },
    Enter: {
        color: "white",
        textAlign: "center",
        marginTop: 15
    },
    dropdown: {
        backgroundColor: '#393B3F',
        width: 300,
        height: 50,
        marginLeft: 30,
        color: 'white',

    }
})