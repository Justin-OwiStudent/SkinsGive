import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import {  auth } from '../firebase'
import { Alert } from 'react-native';
import { createUserInDb } from './firebasedb';

export const registerNewUser = (email, password) => {

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("user:" + user)

        // updateAuthProfile(usernmae)

        await createUserInDb(username, email, user.uid)


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage)

        Alert.alert("Whoops!", [
          { text: 'Try Again', onPress: () => {  } }
        ])
      });
}



export const signInUser = async () => {

  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...

    console.log("User signed in" + user.email)

    Alert.alert("your in", [
      { text: 'Thanks', onPress: () => {  } }
    ])
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode + ": " + errorMessage)

    Alert.alert("whoops!", errorMessage [
      { text: 'Try again', onPress: () => {  } }
    ])

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