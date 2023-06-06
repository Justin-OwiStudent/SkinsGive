import { Alert, Button, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { getCurrentUser } from '../services/firebaseAuth'
import { addCompetitionCollection } from '../services/firebasedb'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { uploadToStorage } from '../services/firebaseStorage';

// import Markdown from 'react-native-markdown-display';

const EnterCompetitionScreen = ({ navigation }) => {

    const [title, setTitle] = useState("")
    const [gun, setGun] = useState("")

    const createEntry = async () => {
        //cal firebase functionlaity
        if (title && gun) {
            var creatorInfo = getCurrentUser()

            var competition = {
                title,
                gun,
                creator: creatorInfo.displayName,
                userId: creatorInfo.uid
            }

            const success = await addCompetitionCollection(competition)
            if (success) {
                console.log("added comp successfully")
                navigation.goBack()
            } else {
                console.log("Whoops... adding project failed.")
                Alert.alert("whoops", "something went wrong when trying to add project")
            }
        } else {
            Alert.alert("whoops", "please add all competition information")
        }


    }


    const copy = `
    Follow these easy steps:

    1. do this
    2. do that
    3. do this again
    
    `

    //IMAGE PICKER ---
    const [image, setImage] = useState(null)

    const [feature, setFeature] = useState("")

    const pickImageFromLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
          });
      
          console.log(result);
      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
    }

    const uploadImageTest = async () => {
        const result = await uploadToStorage(image, "skins/testImage_"+feature);
        console.log(result)
    }


    return (
        <View style={styles.EnterDetails}>
            <Text style={styles.WantEnter}>Want to take part in the M4 competition?</Text>
            <Text style={styles.Followsteps}>Follow these easy steps:</Text>

            <Text style={styles.steps}>
                1.
            </Text>
            <Text style={styles.steps}>
                2.
            </Text>
            <Text style={styles.steps}>
                3.
            </Text>

            <Text style={styles.SkinNameLabel}>Skin name</Text>
            <TextInput style={styles.SkinName}
                keyboardType='default'
                defaultValue={title}
                onChangeText={(newValue) => setTitle(newValue)} />

            <Text style={styles.SkinNameLabel}>gun type</Text>
            <TextInput style={styles.SkinName}
                keyboardType='default'
                defaultValue={gun}
                onChangeText={(newValue) => setGun(newValue)} />



            <Text style={styles.SkinUploadLabel}>Skin image</Text>
            {/* <TextInput style={styles.SkinImage} /> */}
            <View style={styles.inputGroup}>
            <TextInput 
                style={[styles.input, styles.SkinName]}
                placeholder="Feature One Title"
                onChangeText={newText => setFeature(newText)}
                defaultValue={feature}
                returnKeyType='next'/>
    {image ? (
                 <Pressable onPress={() => setImage(null)}>
                    <Ionicons name="trash-outline" size={32} color="red" />
                </Pressable>
            ) : (
                <>
                    <Pressable onPress={() => pickImageFromLibrary(1)}>
                        <Ionicons name="images-outline" size={32} color="black" />
                    </Pressable>
                    <Pressable onPress={() => {}}>
                        <Ionicons name="camera-outline" size={34} color="black" />
                    </Pressable>
                </>
            )}
        </View>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}

                <Button title="upload" onPress={uploadImageTest}/>

            <TouchableOpacity style={styles.upload} onPress={createEntry}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EnterCompetitionScreen

const styles = StyleSheet.create({
    container: {
        // marginLeft: -100
    },
    EnterDetails: {
        alignSelf: 'flex-start',
        marginTop: 10
    },
    WantEnter: {
        color: 'black',
        marginBottom: 20,
        marginLeft: 20
    },
    Followsteps: {
        color: 'black',
        marginBottom: 20,
        marginLeft: 20

    },
    steps: {
        color: 'black',
        textAlign: "left",
        marginLeft: 25

    },

    SkinNameLabel: {
        fontSize: 12,
        marginTop: 20,
        paddingLeft: 30,
        marginBottom: 5,
        color: 'black'
    },
    SkinName: {
        backgroundColor: '#393B3F',
        height: 50,
        width: 300,
        borderRadius: 20,
        color: 'black',
        marginLeft: 30
    },
    SkinUploadLabel: {
        fontSize: 12,
        marginTop: 20,
        paddingLeft: 30,
        marginBottom: 5,
        color: 'black'
    },
    SkinImage: {
        backgroundColor: '#393B3F',
        height: 200,
        width: 325,
        borderRadius: 20,
        color: 'black',
        marginLeft: 30
    },
    upload: {
        width: 150,
        height: 50,
        backgroundColor: '#A12895',
        marginLeft: 30,
        marginTop: 20,
        borderRadius: 20
    },
    inputGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 15,
        alignItems: "center"
    }
})