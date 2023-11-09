import { StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MainScreen from '../Screens/MainScreen';
import CompetitionDetailsScreen from '../Screens/CompetitionDetailsScreen';
import EnterCompetitionScreen from '../Screens/EnterCompetitionScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import AwpDetailScreen from '../Screens/AwpDetailScreen';

// const Tab = createMaterialBottomTabNavigator();

// const Tab = createBottomTabNavigator();

const Tab = createMaterialBottomTabNavigator();

const HomeTab = () => {
    return (
        <Tab.Navigator
        initialRouteName="Landing"
        activeColor="black"
        inactiveColor="black"
        barStyle={{ backgroundColor: '#393B3F' }}
        shifting={true}
    >
        <Tab.Screen name="Landing"
            component={MainScreen}
            options={{
                tabBarColor: '#D32026',
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={23} color="black" />
                ),
            }} />

  
        <Tab.Screen name="Profile"
            component={ProfileScreen}
            options={{
                tabBarColor: '#D32026',
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="person-circle-outline" size={23} color="black" />
                ),
               
            }} />

            <Tab.Screen name="Enter"
            component={EnterCompetitionScreen}
            options={{
                tabBarColor: '#D32026',
                tabBarLabel: 'Add Entry',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="add-circle-outline" size={23} color="black" />
                ),
               
            }} />
    </Tab.Navigator>
    );
  };

export default HomeTab

const styles = StyleSheet.create({
   
})