import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import {  auth } from '../firebase'
import { Alert } from 'react-native';
import { createUserInDb } from './firebasedb';
// import { createUserInDb } from './firebasedb';

export const registerNewUser = (username, email, password, rank) => {

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("user:" + user)

        updateAuthProfile(username)

        //had to be in order, very weird
        await createUserInDb(email, rank, username, user.uid)

        Alert.alert("created user", user)

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage)

        Alert.alert("Whoops", errorMessage)

        // Alert.alert("Whoops!","something went wrong trying to add user" [
        //   { text: 'Try Again', onPress: () => { } }
        // ])
      });
}



export const signInUser = async (email, password) => {

  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log("User signed in" + user.email)

    Alert.alert("your In", "successfully logged")

    // Alert.alert("your in", "successfully logged in." [
    //   { text: 'Thanks', onPress: () => { setLoading(false) }}
    // ])
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode + ": " + errorMessage)

    Alert.alert("Whoops!", errorCode)

    //if based on password wrong of whatever

    // Alert.alert("whoops!", errorMessage [
    //   { text: 'Try again', onPress: () => {  } }
    // ])

  });
}


export const signOutUser =() => {
  signOut(auth).then(()=> {
    console.log("logged out")
  }).catch((error) => {
    console.log(error.errorMessage)
  })

}

export const getCurrentUser= () => {
  return auth.currentUser;
}



const updateAuthProfile = (username) => {
  updateProfile(auth.currentUser, {
    displayName: username, photoURL: "example"
  }).then(() => {

  }).catch(() => {

  })
}