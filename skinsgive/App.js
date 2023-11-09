import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MainScreen from './Screens/MainScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import EnterCompetitionScreen from './Screens/EnterCompetitionScreen';
import { DefaultTheme, NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTab from './Navigator/HomeTab';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import CompetitionDetailsScreen from './Screens/CompetitionDetailsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import { auth } from './firebase';
// import SniperScreen from './Screens/SniperScreen';
import M4Screen from './Screens/M4Screen';
import AkScreen from './Screens/AkScreen';
import AwpDetailScreen from './Screens/AwpDetailScreen';
import M4DetailsScreen from './Screens/M4DetailsScreen';
import AkDetailsScreen from './Screens/AkDetailsScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SniperScreen from './Screens/SniperScreen';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import CompetitionEntries from './Screens/CompetitionEntries';
import CompetitionDetails from './Screens/CompetitionDetails';




const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  
  const [LoggedIn, setLoggedIn] = useState(false) //variable to view screens for auth
  const [fontLoaded, setFontLoaded] = useState(false);

  const [loaded] = useFonts({
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratLight: require('./assets/fonts/Montserrat-Light.ttf'),


  })

  // useEffect(() => {
  //   let isMounted = true;

  //   async function loadFonts() {
  //     try {
  //       await Font.loadAsync({
  //         'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  //         'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  //         'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),

  //         // Add other custom fonts here
  //       });

  //       if (isMounted) {
  //         setFontLoaded(true);
  //       }
  //     } catch (error) {
  //       console.error('Error loading fonts:', error);
  //     }
  //   }

  //   loadFonts();

  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setLoggedIn(true);
  //     } else {
  //       setLoggedIn(false);
  //     }
  //   });

  //   // Cleanup functions to handle unmounting
  //   return () => {
  //     isMounted = false;
  //     unsubscribe();
  //   };
  // }, []); // Empty dependency array means this effect runs once after the initial render

  // // Rest of your component code here

  // if (!fontLoaded) {
  //   return null; // Or return a loading indicator here
  // }


  // useEffect(() => {
  //   let isMounted = true;

  //   async function loadFonts() {
  //     try {
  //       await Font.loadAsync({
  //         'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  //         'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),

  //         // Add other custom fonts here
  //       });

  //       if (isMounted) {
  //         setFontLoaded(true);
  //       }
  //     } catch (error) {
  //       console.error('Error loading fonts:', error);
  //     }
  //   }

  //   loadFonts();

  //   // Cleanup function to handle unmounting
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []); // Empty dependency array means this effect runs once after the initial render

  // if (!fontLoaded) {
  //   return null; // Or return a loading indicator here
  // }
 

  

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("checking if logged In...")
      if(user){
        //user is logged in
        setLoggedIn(true)
      } else {
        //user doesn't exist, meaing they are logged out
        setLoggedIn(false)
      }

    })
    return unsubscribe;
    
  }, [])

 



 if(!loaded) {
  return null;
 }

  return (
    
    <NavigationContainer >
      
      <Stack.Navigator initialRouteName='Login'
       screenOptions={{headerShown: false}}>
       {!LoggedIn ? (
          <>
          <Stack.Screen name="Login" component={LoginScreen}/>  
          <Stack.Screen name="Register" component={RegisterScreen}/>  
          </>
       ): (
        <>
           <Stack.Screen name="Home" component={HomeTab}/>  
          <Stack.Screen 
          name="Details" 
          component={CompetitionDetailsScreen}
          options={({route}) => ({
            headerShown: true,
            // name: route.params.project.name
          })}
          />  
           <Stack.Screen 
           name="Profile" 
           component={ProfileScreen}
           options={{headerShown: true}}

           />  

          <Stack.Screen 
           name="Enter"
           component={EnterCompetitionScreen}
           options={{headerShown: false}}
           />  

          <Stack.Screen 
           name="CompEntries"
           component={CompetitionEntries}
           options={{headerShown: false}}
           /> 
           <Stack.Screen 
           name="CompDetails"
           component={CompetitionDetails}
           options={{headerShown: false}}
           /> 

          <Stack.Screen 
           name="AWP"
           component={SniperScreen}
           options={{headerShown: false}}
           />  

          <Stack.Screen 
           name="M4"
           component={M4Screen}
           options={{headerShown: false}}
           />  

          <Stack.Screen 
           name="AK"
           component={AkScreen}
           options={{headerShown: false}}
           />  
          
          <Stack.Screen 
           name="AwpDetails"
           component={AwpDetailScreen}
           options={{headerShown: false}}
           />  

          <Stack.Screen 
           name="M4Details"
           component={M4DetailsScreen}
           options={{headerShown: false}}
           />  

          <Stack.Screen 
           name="AkDetails"
           component={AkDetailsScreen}
           options={{headerShown: false}}
           /> 
        </>
     

        

       )} 
       
     

      </Stack.Navigator>
      
      
    </NavigationContainer>

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202226',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
