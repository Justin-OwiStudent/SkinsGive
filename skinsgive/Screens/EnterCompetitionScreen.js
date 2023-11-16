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
        const creatorInfo = getCurrentUser();
    
        const competition = {
            name,
            value,
            exterior,
            creator: creatorInfo.displayName,
            userId: creatorInfo.uid,
            score: 0,
        };
    
        const skins = image ? [{ imageUrl: image, title: name }] : [];
    
        let success = false;
    
        switch (value) {
            case 'AWP':
                success = await addAwpSkin(competition, skins);
                break;
            case 'M4A4':
                success = await addM4Skin(competition, skins);
                break;
            case 'AK-47':
                success = await addAkSkin(competition, skins);
                break;
            default:
                console.log('Unknown skin type');
                break;
        }
    
        if (success) {
            console.log(`Added ${value} skin successfully`);
            navigation.goBack();
        } else {
            console.log('Whoops... adding Skin failed.');
            Alert.alert('Whoops', 'Something went wrong when trying to add Skin');
        }
    };
    


    //IMAGE PICKER ---
    const [image, setImage] = useState(null)



    const pickImageFromLibrary = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [6, 4],
                quality: 0.9,
            });
    
            if (!result.cancelled) {
                setImage(result.assets[0].uri);
            } else {
                console.log('Image picker cancelled');
            }
        } catch (error) {
            console.error('Error picking image from library:', error);
        }
    };
    

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
                    {image && <Image source={{ uri: image }} style={{ alignSelf: "center", width: "100%", height: "100%",  borderRadius: 20, resizeMode: "contain" }} />}
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

})