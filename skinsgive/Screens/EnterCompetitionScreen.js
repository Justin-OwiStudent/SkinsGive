import { Alert, Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
    const [exterior, setExterior] = useState("")




    const createEntry = async () => {
        //AWP ADD
        if (value === "AWP") {
            var creatorInfo = getCurrentUser()

            var competition = {
                name,
                value,
                exterior,
                creator: creatorInfo.displayName,
                userId: creatorInfo.uid,
                score: 0
            }

            //create array for all skin images, for sub collection
            var skins = []
            image && skins.push({ imageUrl: image, title: name })

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
                exterior,
                creator: creatorInfo.displayName,
                userId: creatorInfo.uid,
                score: 0
            }

            //create array for all skin images, for sub collection
            var skins = []
            image && skins.push({ imageUrl: image, title: name })

            const success = await addM4Skin(competition, skins)
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
                exterior,
                creator: creatorInfo.displayName,
                userId: creatorInfo.uid,
                score: 0
            }

            var skins = []
            image && skins.push({ imageUrl: image, title: name })

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

    const uploadTest = async () => {
        const result = await uploadToStorage(image, "skin/testImage_" + name);
        console.log(result)
    }

    const back = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={back}>
                <Ionicons name="chevron-back-outline" size={30} color="white" />
            </TouchableOpacity>

            
            <ScrollView>
            
            <View style={styles.SubmitSection}>
                <Text style={styles.SubmitText}>Submit</Text>
                <Text style={styles.SubmitEntryText}>Your Entry</Text>
            </View>
            <View style={styles.Guidelines}>
                <Text style={styles.GuidelinesText}>Guidelines</Text>

                <Text style={styles.steps}>1. Enter the full name of the skin</Text>
                <Text style={styles.steps}>2. Choose the skin weapon class</Text>
                <Text style={styles.steps}>3. Upload a high-quality image of youre skin</Text>

                <TextInput style={styles.Input}
                    onChangeText={(newValue) => setName(newValue)}
                    value={name}
                    placeholder="Skin Name"
                    placeholderTextColor="rgb(174, 179, 185)"
                />

                <TextInput style={styles.Input2}
                    onChangeText={(newValue) => setExterior(newValue)}
                    value={exterior}
                    placeholder="Skin Exterior"
                    placeholderTextColor="rgb(174, 179, 185)"
                />  

                <DropDownPicker
       
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    textStyle={{
                        fontSize: 14,
                        fontFamily: "MontserratRegular",
                        color: "rgb(174, 179, 185)",
                      }}
                    style={styles.dropdown}
                    placeholder={"Weapon Class"}
                    placeholderStyle={{
                        color: "rgb(174, 179, 185)",
                        fontFamily: "MontserratRegular"
                    }}
                    dropDownDirection="AUTO"
                    theme="DARK"
                    listMode="MODAL"
                    modalProps={{
                        animationType: "fade"
                    }}
                    modalTitle="Select a Weapon Class"
                    modalAnimationType="fade"
                    modalContentContainerStyle={{
                        backgroundColor: "#20232A"
                    }}
                    modalTitleStyle={{
                        fontFamily: "MontserratRegular"
                    }}
                    closeAfterSelecting={true}
                />


            
            <Text style={styles.SkinUploadLabel}>Upload your design</Text>
                <View style={styles.SkinImage}>
                    {image && <Image source={{ uri: image }} style={{ alignSelf: "center", width: "100%", height: "100%",  borderRadius: 20 }} />}
                    {image ? (
                        <Pressable style={styles.TrashIcon} onPress={() => setImage(null)}>
                            <Ionicons name="close-outline" size={32} color="red" />
                        </Pressable>
                    ) : (
                        <>
                            <Pressable style={styles.uploadImgaeButton} onPress={() => pickImageFromLibrary(1)}>
                                <Ionicons name="add-outline" size={65} color="#AEB3B9"  />
                            </Pressable>
                        </>
                    )}
                    
                    
                </View>
            </View>
            

            <TouchableOpacity style={styles.submitButton} onPress={createEntry}>
                            <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            </ScrollView>
           

        </View>

    )
}

export default EnterCompetitionScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#20232A",
        height: "100%",
        padding: 10,
        paddingTop: 75,
        
    },
    SubmitSection: {
        marginLeft: 10,
        marginTop: 10
    },
    SubmitText: {
        color: '#FED32C',
        fontSize: 30,
        // marginBottom: 30,
        fontFamily: 'MontserratBold',
    },
    SubmitEntryText: {
        fontSize: 30,
        // marginBottom: 30,
        fontFamily: 'MontserratRegular',
        color: "#AEB3B9"
    },
    Guidelines: {
        marginLeft: 10,
        marginTop: 30
    },
    GuidelinesText: {
        color: '#FED32C',
        fontFamily: 'MontserratRegular',
        fontSize: 20,
        marginBottom: 20
    },
    steps: {
        color: "#AEB3B9",
        fontFamily: 'MontserratRegular',
        fontSize: 13
    },
    Input: {
        backgroundColor: '#3A3F4A',
        height: 40,
        width: "95%",
        borderRadius: 20,
        marginTop: 30,
        paddingLeft: 15,
        color: "#AEB3B9",
        fontFamily: 'MontserratRegular',
        fontSize: 14
    },
    Input2: {
        backgroundColor: '#3A3F4A',
        height: 40,
        width: "95%",
        borderRadius: 20,
        marginTop: 15,
        paddingLeft: 15,
        color: "#AEB3B9",
        fontFamily: 'MontserratRegular',
        fontSize: 14
    },
    dropdown: {
        backgroundColor: '#3A3F4A',
        // height: 40,
        width: "95%",
        marginTop: 15,
        fontFamily: 'MontserratRegular',
        borderRadius: 20,
        borderColor: "transparent",
        maxHeight: 40,
        fontSize: 14
    },
    
    SkinUploadLabel: {
        fontSize: 14,
        // fontFamily: "MontserratRegular",
        marginTop: 30,
        color: "#AEB3B9",
        fontFamily: 'MontserratRegular',
    },
    SkinImage: {
        width: "95%",
        height: 200,
        backgroundColor: "#3A3F4A",
        marginTop: 10,
        // alignSelf: "center",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    uploadImgaeButton: {
        position: "absolute",
        
    },
    TrashIcon:{
        position: "absolute",
        top: -25,
        right: -25
    },
    submitButton: {
        width: "95%",
        height: 40,
        backgroundColor: "#FED32C",
        alignSelf: "center",
        marginTop: 30,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0
    },
    submitButtonText: {
        fontFamily: "MontserratRegular",
        fontSize: 16
    }


    // EnterDetails: {
    //     alignSelf: 'flex-start',
    //     marginTop: 10,

    //     // backgroundColor: "#A12895",

    // },
    // WantEnter: {

    //     color: 'white',
    //     marginBottom: 20,
    //     marginLeft: 20
    // },
    // Followsteps: {
    //     color: 'white',
    //     marginBottom: 20,
    //     marginLeft: 20

    // },
    // steps: {
    //     color: 'white',
    //     textAlign: "left",
    //     marginLeft: 25

    // },

    // SkinNameLabel: {
    //     fontSize: 12,
    //     marginTop: 20,
    //     paddingLeft: 30,
    //     marginBottom: 5,
    //     color: 'white'
    // },
    // SkinName: {
    //     backgroundColor: '#393B3F',
    //     height: 50,
    //     width: 300,
    //     borderRadius: 20,
    //     color: 'white',
    //     marginLeft: 30,
    //     paddingLeft: 15
    // },
    // SkinUploadLabel: {
    //     fontSize: 12,
    //     marginTop: 20,
    //     paddingLeft: 30,
    //     marginBottom: 15,
    //     color: 'white'
    // },
    // SkinImage: {
    //     backgroundColor: '#393B3F',
    //     height: 210,
    //     width: 300,
    //     borderRadius: 20,
    //     color: 'black',
    //     marginLeft: 30,
    //     marginBottom: 20
    // },
    // upload: {
    //     width: 150,
    //     height: 50,
    //     backgroundColor: '#D32026',
    //     marginLeft: 30,
    //     marginTop: 20,
    //     borderRadius: 20,
    //     borderWidth: 2,
    //     borderColor: "black"
    // },
    // uploadImgaeButton: {
    //     marginBottom: 20
    // },
    // inputGroup: {
    //     display: "flex",
    //     flexDirection: "row",
    //     // justifyContent: "space-between",
    //     gap: 15,
    //     alignItems: "left",
    //     marginLeft: 50
    // },
    // Enter: {
    //     color: "white",
    //     textAlign: "center",
    //     marginTop: 15
    // },
    // dropdown: {
    //     backgroundColor: '#393B3F',
    //     width: 300,
    //     height: 50,
    //     marginLeft: 30,
    //     color: 'white',

    // }
})