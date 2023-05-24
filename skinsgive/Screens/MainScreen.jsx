import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CompetitionCards from '../components/CompetitionCards'

const MainScreen = ({ navigation }) => {

   dummyData = [
      { title: 'M4A4 Skin Competition', gun: "M4A4", Entries: 2, EntryOne: "Howl", EntryTwo: "DesolateSpace", EntryThree: "BuzzKill" },
      { title: 'AK-47 Skin Competition', gun: "AK-47", Entries: 10, EntryDetails: ["Howl", "Desolate Space", "Neon Rider"] },
      { title: 'AWP Skin Competition', gun: "AWP", Entries: 2, EntryDetails: ["Howl", "Desolate Space", "Neon Rider"] },
      { title: 'USP Skin Competition', gun: "USP", Entries: 2, EntryDetails: ["Howl", "Desolate Space", "Neon Rider"] },
   ]

   return (
      <View style={styles.container}>
         <ScrollView style={styles.scroll}>

         <View style={styles.bar} >
            <Image style={styles.logo} source={require("../assets/CompLogo.png")} />

         </View>

         <Text style={styles.title}> Ongoing Competitions </Text>

            {dummyData.map((project, index) => (
               <TouchableOpacity key={index}
                  onPress={() => navigation.navigate("Details", { project })}
                  activeOpacity={0.75}>
                  <CompetitionCards data={project} />
               </TouchableOpacity>

            ))}
         </ScrollView>
         {/* <View style={styles.navBar}> 
      <Image style={styles.navIcon} source={require("../assets/CompLogo.png")}/>
      <Image style={styles.navIcon} source={require("../assets/CompLogo.png")}/>
      <Image style={styles.navIcon} source={require("../assets/CompLogo.png")}/>

    </View> */}
      </View> 
   )
}

export default MainScreen

const styles = StyleSheet.create({
   container: {
      padding: 20,

   },
   bar: {
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: '#393B3F',
      alignSelf: 'center',
      marginBottom: 15,
      marginTop: 25,
      resizeMode: 'contain',
      borderWidth: 1,
      borderColor: '#A12895',
   },
   logo: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover'

   },
   title: {
      textAlign: 'center',
      fontSize: 18,
      color: '#A12895',
      marginBottom: 15,

   },
   scroll: {
      width: '100%',
      height: '110%',
      marginTop: 20,
      borderRadius: 20
   },
   navBar: {
      width: 300,
      height: 60,
      backgroundColor: '#393B3F',
      marginBottom: 1,
      alignSelf: 'center',
      borderRadius: 25,
      zIndex: 999,
      flexDirection: 'row',
      paddingLeft: 25,
      marginTop: 5,

   },
   navIcon: {
      width: 60,
      height: 60,
      marginRight: 35
   }
})

//TODO: make colours a global style 
//TODO: make the navbar a global style (do research on navbar)
