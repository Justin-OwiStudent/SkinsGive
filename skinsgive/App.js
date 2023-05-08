import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './Screens/MainScreen';

export default function App() {
  return (
    <View style={styles.container}>
     <MainScreen/>
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
