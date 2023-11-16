import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCurrentUser, signOutUser } from '../services/firebaseAuth'
import Ionicons from '@expo/vector-icons/Ionicons';
import { GetUserDetails, getAk, getAllComps, getAwp, getM4 } from '../services/firebasedb';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
    const [enteredCompetitions, setEnteredCompetitions] = useState(0);
    const [enteredComps, setEnteredComps] = useState(0);
    const [userWins, setUserWins] = useState(0);

    const [userDetails, setUserDetails] = useState("");


    const user = getCurrentUser()
    const uid = user.uid;

    console.log(user.wins)
    const displayName = user.displayName

   

    useEffect(() => {
        getAllCompetitions();
        const wins = user?.wins !== undefined ? user.wins : 0;
        setUserWins(wins);
    }, []);

   console.log(userWins)

    const getAllCompetitions = async () => {
        try {
            const allOne = await getAwp();
            const allTwo = await getM4();
            const allThree = await getAk();

            const awp = allOne;
            const m4 = allTwo;
            const ak = allThree;

            const allComps = ak.concat(m4, awp);
           

            const userEnteredComps = allComps.filter(comp => comp.creator === displayName);
            console.log(userEnteredComps)
            setEnteredCompetitions(userEnteredComps.length);
            setEnteredComps(userEnteredComps);
            console.log(enteredComps)

        } catch (error) {
            console.error('Error fetching competitions:', error);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.MyProfileText}>My Profile</Text>

            <Text style={styles.Username}>{user.displayName}</Text>

            <View style={styles.EntriesOverview}>
                <View style={styles.entries}>
                    <Text style={styles.amount}>{enteredCompetitions}</Text>
                    <Text style={styles.amountTitle}>Entries</Text>

                </View>
                <View style={styles.entries}>
                    <Text style={styles.amount}>{userWins}</Text>
                    <Text style={styles.amountTitle}>Wins</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.LogoutButton} onPress={() => signOutUser()}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            {/* <Text style={styles.PastEntries}>Past Entries</Text>
            <ScrollView style={styles.scrollEntries}>


                {enteredComps && enteredComps.map((entered, index) => (
                    <TouchableOpacity style={styles.PastEntryCard} key={index}>
                        <LinearGradient
                            colors={['transparent', '#3A3F4A']}
                            style={styles.gradient}
                        />
                        <Text style={styles.SkinName}>{entered.name}</Text>
                        <Text style={styles.SkinType}>{entered.value}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView> */}
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        padding: 20,
        backgroundColor: "#202226",
        height: "100%",
        alignItems: "center"
    },
    MyProfileText: {
        fontFamily: "MontserratBold",
        color: "#FED32C",
        fontSize: 30,
        marginTop: 30
    },
    Username: {
        fontFamily: "MontserratBold",
        color: "#AEB3B9",
        fontSize: 30,
        marginTop: 50
    },
    EntriesOverview: {
        width: "100%",
        height: 100,
        // backgroundColor: "red",
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    entries: {
        width: "48%",
        height: "100%",
        backgroundColor: "#2B2F38",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    amount: {
        fontSize: 32,
        marginBottom: 5,
        fontFamily: "MontserratLight",
        color: "#AEB3B9"
    },
    amountTitle: {
        fontSize: 16,
        fontFamily: "MontserratBold",
        color: "#FED32C"
    },
    LogoutButton: {
        width: "100%",
        height: 40,
        backgroundColor: "#FED32C",
        marginTop: 25,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",

    },
    logoutText: {
        fontFamily: "MontserratRegular",
        fontSize: 16
    },
    PastEntries: {
        fontSize: 25,
        fontFamily: "MontserratRegular",
        marginTop: 25,
        color: "#AEB3B9"
    },
    scrollEntries: {
        height: 500,
        width: "90%",
        paddingTop: 20,
        borderRadius: 10

    },
    PastEntryCard: {
        width: "100%",
        height: 100,
        backgroundColor: "#2B2F38",
        marginBottom: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    SkinName: {
        color: "#FED32C",
        fontSize: 30,
        fontFamily: "MontserratBold"
    },
    SkinType: {
        color: "#AEB3B9",
        fontSize: 15,
        fontFamily: "MontserratRegular"
    }


})


