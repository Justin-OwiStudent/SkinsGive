import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CompetitionCards from '../components/CompetitionCards'

const MainScreen = () => {

    dummyData = [
        {title: 'Project 1', year: 2023, creator: 'Armand', tech: ["React Native", 'Firebase']},
        {title: 'Project 2', year: 2023, creator: 'Armand', tech: ["React Native", 'Firebase']},
        {title: 'Project 2', year: 2023, creator: 'Armand', tech: ["React Native", 'Firebase']},
        {title: 'Project 2', year: 2023, creator: 'Armand', tech: ["React Native", 'Firebase']},
        {title: 'Project 2', year: 2023, creator: 'Armand', tech: ["React Native", 'Firebase']},

    ]

  return (
    <View  style={styles.container}>
        
      <View style={styles.bar} >
      <Image style={styles.logo} source={require("../assets/CompLogo.png")}/>

      </View>  

      <Text style={styles.title}> Ongoing Competitions </Text>

      <ScrollView>
        {dummyData.map((project, index) => (
            <CompetitionCards key={index} data={project}/>
        ))}
    </ScrollView>

    <View style={styles.navBar}> 
      <Image style={styles.navIcon} source={require("../assets/CompLogo.png")}/>
      <Image style={styles.navIcon} source={require("../assets/CompLogo.png")}/>
      <Image style={styles.navIcon} source={require("../assets/CompLogo.png")}/>

    </View>

    </View> //container 
    
  )
}

export default MainScreen

const styles = StyleSheet.create({
 container: {
    padding: 20,
    
 },
 bar: {
    width: 100,
    height: 100,
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
    width: 100,
    height: 100,
    resizeMode: 'cover'

 },
 title: {
    textAlign: 'center',
    fontSize: 18,
    color: '#A12895',
    marginBottom: 15,

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
