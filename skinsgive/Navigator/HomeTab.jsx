import { StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native'
import React from 'react'
//tab bar for home screens
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// import ProfileScreen from '../screens/ProfileScreen';

import Ionicons from '@expo/vector-icons/Ionicons';
import MainScreen from '../Screens/MainScreen';
import CompetitionDetailsScreen from '../Screens/CompetitionDetailsScreen';
import EnterCompetitionScreen from '../Screens/EnterCompetitionScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import AwpDetailScreen from '../Screens/AwpDetailScreen';

// const Tab = createBottomTabNavigator();

const Tab = createMaterialBottomTabNavigator();

const HomeTab = () => {

    return (
 

        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#A12895"
            inactiveColor="#A12895"
            barStyle={{ backgroundColor: '#393B3F' }}
            shifting={true}
        >
            <Tab.Screen name="Home"
                component={MainScreen}
                options={{
                    tabBarColor: '#A12895',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={30} color="black" />
                    ),
                }} />

      
            <Tab.Screen name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarColor: '#A12895',
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-circle-outline" size={30} color="black" />
                    ),
                   
                }} />
        </Tab.Navigator>

       
    )
}

export default HomeTab

const styles = StyleSheet.create({
    logout: {
        paddingbottom: 10,
        paddingRight: 10
    }
})