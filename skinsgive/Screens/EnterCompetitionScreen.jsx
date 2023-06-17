import { Alert, Button, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { getCurrentUser } from '../services/firebaseAuth'
import { addAkSkin, addAwpSkin, addCompetitionCollection, addM4Skin } from '../services/firebasedb'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { uploadToStorage } from '../services/firebaseStorage';
import DropDownPicker from 'react-native-dropdown-picker';

// import Markdown from 'react-native-markdown-display';

const EnterCompetitionScreen = ({ navigation }) => {


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'AWP', value: 'AWP' },
        { label: 'M4A4', value: 'M4A4' },
        { label: 'AK-47', value: 'AK-47'}

    ]);



    const [name, setName] = useState("")
    // const [gun, setGun] = useState("")

    const createEntry = async () => {
        //AWP ADD
        if (value === "AWP") {
            var creatorInfo = getCurrentUser()

            var competition = {
                name,
                value,
                
                // creator: creatorInfo.displayName,
                // userId: creatorInfo.uid,
                score: 0
            }

            const success = await addAwpSkin(competition)
            if (success) {
                console.log("added Skin successfully")
                navigation.goBack()
                uploadImageTest()
            } else {
                console.log("Whoops... adding Skin failed.")
                Alert.alert("whoops", "something went wrong when trying to add Skin")
            }
        } else if (value === "M4A4") {
            var competition = {
                name,
                value,
                

                // creator: creatorInfo.displayName,
                // userId: creatorInfo.uid,
                score: 0
            }
            const success = await addM4Skin(competition)
            if (success) {
                console.log("added M4 successfully")
                navigation.goBack()
                uploadImageTest()
            } else {
                console.log("Whoops... adding M4 failed.")
                Alert.alert("whoops", "something went wrong when trying to add M4")
            }
        } else if(value === "AK-47") {
            var competition = {
                name,
                value,
                

                // creator: creatorInfo.displayName,
                // userId: creatorInfo.uid,
                score: 0
            }

            const success = await addAkSkin(competition)
            if (success) {
                console.log("added comp successfully")
                navigation.goBack()
                uploadImageTest()
            } else {
                console.log("Whoops... adding project failed.")
                Alert.alert("whoops", "something went wrong when trying to add project")
            }
        }


    }


    //ONE THAT WORKED
    // const createEntry = async () => {
    //     //cal firebase functionlaity
    //     if (value === "AWP") {
    //         var creatorInfo = getCurrentUser()

    //         var competition = {
    //             title,
    //             gun,
    //             value,
    //             // creator: creatorInfo.displayName,
    //             // userId: creatorInfo.uid,
    //             score: 0
    //         }

    //         const success = await addCompetitionCollection(competition)
    //         if (success) {
    //             console.log("added comp successfully")
    //             navigation.goBack()
    //             uploadImageTest()
    //         } else {
    //             console.log("Whoops... adding project failed.")
    //             Alert.alert("whoops", "something went wrong when trying to add project")
    //         }
    //     } else {
    //         Alert.alert("whoops", "please add all competition information")
    //     }


    // }


   

    //IMAGE PICKER ---
    const [image, setImage] = useState(null)

    // const [feature, setFeature] = useState("")

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
        const result = await uploadToStorage(image, "skins/testImage_" + feature);
        console.log(result)
    }


    return (
        <View style={styles.EnterDetails}>
            <Text style={styles.WantEnter}>Want to take part in the M4 competition?</Text>
            <Text style={styles.Followsteps}>Follow these easy steps:</Text>

            <Text style={styles.steps}>
                1. Enter the full name of skin.
            </Text>
            <Text style={styles.steps}>
                2. Enter catagory for given skin.
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

            {/* <Text style={styles.SkinNameLabel}>gun type:</Text>
            <TextInput style={styles.SkinName}
                keyboardType='default'
                // defaultValue={gun}
                // onChangeText={(newValue) => setGun(newValue)} 
                /> */}



            <Text style={styles.SkinUploadLabel}>Select Image:</Text>
            <View style={styles.SkinImage}>
                {image && <Image source={{ uri: image }} style={{ alignSelf: "center", width: 200, height: 200, marginTop: 5, borderRadius: 20 }} />}
            </View>
            {/* <TextInput style={styles.SkinImage} /> */}
            <View style={styles.inputGroup}>
                {/* <TextInput 
                style={[styles.input, styles.SkinName]}
                placeholder="Feature One Title"
                onChangeText={newText => setFeature(newText)}
                defaultValue={feature}
                returnKeyType='next'/> */}

                {/* <View style={styles.SkinImage}>
                    <Image url={image} />
                </View> */}
                {image ? (
                    <Pressable onPress={() => setImage(null)}>
                        <Ionicons name="trash-outline" size={32} color="red" />
                    </Pressable>
                ) : (
                    <>
                        <Pressable style={styles.uploadImgaeButton} onPress={() => pickImageFromLibrary(1)}>
                            <Ionicons name="images-outline" size={32} color="black" />
                        </Pressable>
                        <Pressable onPress={() => { }}>
                            <Ionicons name="camera-outline" size={34} color="black" />
                        </Pressable>
                    </>
                )}
            </View>



            {/* <Button title="upload" onPress={uploadImageTest}/> */}

            <TouchableOpacity style={styles.upload} onPress={createEntry}>
                <Text style={styles.Enter}>Enter Comp</Text>
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
        color: 'white',
        marginLeft: 30,
        paddingLeft: 15
    },
    SkinUploadLabel: {
        fontSize: 12,
        marginTop: 20,
        paddingLeft: 30,
        marginBottom: 15,
        color: 'black'
    },
    SkinImage: {
        backgroundColor: '#393B3F',
        height: 210,
        width: 210,
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