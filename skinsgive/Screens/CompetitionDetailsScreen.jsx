import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CompetitionDetailsScreen = ({ route, navigation }) => {

    const { project } = route.params;

    return (
        <SafeAreaView>
            <View style={styles.entries}>
                <Text style={styles.entryOne}>{project.EntryOne}</Text>
            </View>

            <View style={styles.entries}>
                <Text style={styles.entryOne}>{project.EntryTwo}</Text>
            </View>

            <View style={styles.entries}>
                <Text style={styles.entryOne}>{project.EntryThree}</Text>
            </View>
        </SafeAreaView>
    )
}

export default CompetitionDetailsScreen

const styles = StyleSheet.create({
    entries: {
        width: '80%',
        height: 100,
        backgroundColor: '#393B3F',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 20
    },
    entryOne: {
        color: 'white',
        textAlign: 'center'
    }
})