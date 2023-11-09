import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCurrentUser, signOutUser } from '../services/firebaseAuth'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAk, getAllComps, getAwp, getM4 } from '../services/firebasedb';


const ProfileScreen = () => {
    // const [entered, setEntered] = useState([])
    const [enteredCompetitions, setEnteredCompetitions] = useState(0);

    const user = getCurrentUser()

    
    // console.log(user.uid)

    useEffect(() => {
        getAllCompetitions();
      }, []);

    const getAllCompetitions = async () => {
        try {
          const allOne = await getAwp();
          const allTwo = await getM4();
          const allThree = await getAk();
    
          const awp = allOne;
          const m4 = allTwo;
          const ak = allThree;
    
          const allComps = ak.concat(m4, awp);
        //   console.log(allComps)
    
          // Assuming userName is the user's name
          
          const userEnteredComps = allComps.filter(comp => comp.creator === user.displayName);

          setEnteredCompetitions(userEnteredComps.length);
          
          
         
          console.log(enteredCompetitions)
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
                    <Text style={styles.amount}>7</Text>
                    <Text style={styles.amountTitle}>Wins</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.LogoutButton} onPress={getAllCompetitions}> 
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            <Text style={styles.PastEntries}>Past Entries</Text>

            {/* <View style={styles.ProfileSection}>
                <Text style={styles.ProfileText}> Profile </Text>
                <View style={styles.profilePicture}>
               <Image style={styles.logo} source={require("../assets/AVATAR.png")} />
                    
                </View>
                <Text style={styles.username}> {user.displayName} </Text>

                <Image style={styles.Rank} source={require("../assets/DMG.png")} />
            </View>
            <Text style={styles.heading}>COMPETITIONS</Text>
            <View style={styles.CompDetails}>
           
                <View style={styles.compEntered}>
                    <Text style={styles.enter}>  Entered </Text>
                    <Text style={styles.enterAmount}> 0 </Text>
                </View>

                <View style={styles.compWon}>
                    <Text style={styles.Won}>  Won </Text>
                    <Text style={styles.WonAmount}> 0 </Text>
                </View>

            </View>
            <TouchableOpacity style={styles.logout} onPress={() => signOutUser()}>
      
                <Text style={styles.logoutText}>LOG OUT!</Text>
            </TouchableOpacity> */}

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

    }



    // logout: {
    //     width: 180,
    //     height: 50,
    //     backgroundColor: "#D32026",
    //     marginLeft: "50%",
    //     borderRadius: 10,
    //     marginTop: 80
    // },
    // logoutText: {
    //     fontSize: 25,
    //     marginLeft: 35,
    //     marginTop: 10,
    //     color: "#ffff"
    // },
    
    // ProfileText: {
    //     textAlign: 'center',
    //     color: 'white',
    //     fontSize: 20,
    //     marginBottom: 15,
    //     marginTop: 35
    // },
    // profilePicture: {
    //     width: 150,
    //     height: 150,
    //     borderRadius: 100,
    //     backgroundColor: '#2E3034',
    //     border: 1,
    //     borderColor: '#A12895',
    //     alignSelf: 'center',
        

    // },
    // username: {
    //     textAlign: 'center',
    //     color: 'white',
    //     fontSize: 25,
    //     marginTop: 5
    // },
    // Rank: {
    //     width: 150,
    //     height: 60,
    //     // backgroundColor: 'white',
    //     alignSelf: 'center',
    //     marginTop: 25,
    //     resizeMode: 'contain',

    // },
    // CompDetails: {
    //     width: 350,
    //     height: 150,
    //     // backgroundColor: 'red',
    //     marginTop: 10,
    //     flexDirection: 'row'
    // },
    // compEntered: {
    //     width: 150,
    //     height: 125,
    //     backgroundColor: '#2E3034',
    //     marginRight: 20,
    //     marginLeft: 15,
    //     marginTop: 10,
    //     borderRadius: 20
    // },
    // compWon: {
    //     width: 150,
    //     height: 125,
    //     backgroundColor: '#2E3034',
    //     marginTop: 10,
    //     borderRadius: 20
    // },
    // enter: {
    //     color: 'white',
    //     fontSize: 18,
    //     textAlign: 'center',
    //     marginTop: 10
    // },
    // enterAmount: {
    //     color: '#D32026',
    //     fontSize: 25,
    //     textAlign: 'center',
    //     marginTop: 20
    // },
    // Won: {
    //     color: 'white',
    //     fontSize: 18,
    //     textAlign: 'center',
    //     marginTop: 10
    // },
    // WonAmount: {
    //     color: '#D32026',
    //     fontSize: 25,
    //     textAlign: 'center',
    //     marginTop: 20
    // },
    // navBar: {
    //     width: 300,
    //     height: 60,
    //     backgroundColor: '#393B3F',
    //     marginBottom: 25,
    //     alignSelf: 'center',
    //     borderRadius: 25,
    //     zIndex: 999,
    //     flexDirection: 'row',
    //     paddingLeft: 25
    // },
    // navIcon: {
    //     width: 60,
    //     height: 60,
    //     marginRight: 35
    // },
    // heading: {
    //     color: "white",
    //     textAlign: "center",
    //     marginTop: 20,
    //     fontSize: 25
    // }, 
    // logo: {
    //     width: 150,
    //     height: 150
    // }
})


