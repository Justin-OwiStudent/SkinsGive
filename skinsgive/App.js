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
import SniperScreen from './Screens/SniperScreen';
import M4Screen from './Screens/M4Screen';
import AkScreen from './Screens/AkScreen';
import AwpDetailScreen from './Screens/AwpDetailScreen';
import M4DetailsScreen from './Screens/M4DetailsScreen';
import AkDetailsScreen from './Screens/AkDetailsScreen';



const Stack = createNativeStackNavigator();

export default function App() {

  // const LoggedIn = false

  const [LoggedIn, setLoggedIn] = useState(false) //variable to view screens for auth

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
