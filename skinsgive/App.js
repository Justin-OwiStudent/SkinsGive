import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './Screens/MainScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import EnterCompetitionScreen from './Screens/EnterCompetitionScreen';

export default function App() {
  return (
    <View style={styles.container}>
     <MainScreen/>
     {/* <LoginScreen/> */}
     {/* <RegisterScreen/> */}
     {/* <ProfileScreen/> */}
     {/* <EnterCompetitionScreen/> */}
    </View>
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
