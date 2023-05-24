import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {  auth } from '../firebase'

export const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("ser:" + user)

       

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error + ": " + errorMessage)

        
      });
}

export const signInUser = async () => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...

    Alert.alert("your in"), [
        {text: 'Thanks', onPress: () => { }}
    ]
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    Alert.alert("woops" + errorMessage), [
        {text: 'try again', onPress: () => { }}
    ]
  });
}


