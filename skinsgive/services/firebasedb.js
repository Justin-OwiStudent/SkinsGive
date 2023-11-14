import { Timestamp, addDoc, collection,where, increment, doc, getDocs, orderBy, query, setDoc, ref, onValue, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { uploadToStorage } from "./firebaseStorage";




//--USER COLLCTION
export const createUserInDb = async (email, rank, username, uid) => {

    try {
        console.log("creating user in db..." + uid);
        const docRef = await setDoc(doc(db, "users", uid), {
            email,
            rank,
            username,
            createdAt: Timestamp.now(),
        })
       

    } catch (e) {
        console.log("something went wromg: " + e)
    }

}

export const GetUserDetails = async (username) => {
    try {
        var UserDetails = []

        const snapshot = await getDocs(collection(db, "users", username))

        snapshot.forEach((doc) => {
            UserDetails.push({ ...doc.data(), id: doc.id })
        })

        return UserDetails
    } catch (error) {
        console.log("Error fetching UserDetails", error)
        return []
    }

}


export const updateUserWins = async (username) => {
  try {
    // Create a query to find the user document with the matching username
    const userQuery = query(collection(db, "users"), where("username", "==", username));
    const userQuerySnapshot = await getDocs(userQuery);

    if (!userQuerySnapshot.empty) {
      // There should be only one user document with the same username
      const userDoc = userQuerySnapshot.docs[0];

      // Get the current "wins" value, or initialize it to 0 if it doesn't exist
      const currentWins = userDoc.data().wins || 0;
      const newWins = currentWins + 1;

      // Update the "wins" field for the user
      await updateDoc(userDoc.ref, {
        wins: newWins
      });

      console.log("User wins updated successfully");
    } else {
      console.log("User document not found");
    }
  } catch (error) {
    console.error("Error updating user wins:", error);
  }
};

  
  

const fetchDataFromFirestore = async () => {
    try {
      // Perform a database query using the `db` object
      const querySnapshot = await getDocs(collection(db, "users"));
      // Process the query result
      querySnapshot.forEach((doc) => {
        console.log("Document data:", doc.data());
      });
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };


// const getUserDoc = async (userId) => {
//     try {
//       const userDocRef = db.collection('users').doc(userId);
//       const userDoc = await userDocRef.get();
  
//       if (userDoc.exists) {
//         return userDoc.data();
//       } else {
//         console.log('User document not found');
//         return null;
//       }
//     } catch (error) {
//       console.error('Error getting user document:', error);
//       throw error; // You might want to handle the error accordingly in your application
//     }
//   };
  
//   export { getUserDoc };

// const updateUserWins = async (userId, updatedWins) => {
//     try {
//       const userRef = db.collection('users').doc(userId);
  
//       await userRef.set({
//         wins: updatedWins,
//       }, { merge: true });
  
//       console.log('User wins updated successfully');
//     } catch (error) {
//       console.error('Error updating user wins:', error);
//       throw error;
//     }
//   };
  
//   export { updateUserWins };
  

  



const getEntriesForCompetition = async (competitionId) => {
    try {
      const entriesSnapshot = await getDocs(
        collection(db, 'competitions', competitionId, 'Skins')
      );
  
      // Directly return the data array
      return entriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching entries:', error);
      throw error;
    }
  };
  
  export { getEntriesForCompetition };

  const getEntriesForWinnigCompetition = async (outerCompId) => {
    try {
      const entriesSnapshot = await getDocs(
        collection(db, 'competitions', outerCompId, 'Skins')
      );
  
      // Directly return the data array
      return entriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching entries:', error);
      throw error;
    }
  };
  
  export { getEntriesForWinnigCompetition };
  
  export const getCompetitionImage = async (competitionId, CompId) => {
    try {
        var skins = [];
        const snapshot = await getDocs(collection(db, `competitions/${competitionId}/Skins/${CompId}/skin`));

        snapshot.forEach((doc) => {
            skins.push(doc.data());
        });

        return skins;
        
    } catch (e) {
        console.log("something went wrong" + e);
        return [];
    }
};

export const UpdateSkinScore = async (competitionId, CompId) => {
    try {
      // Reference to the specific skin document
      const skinDocRef = doc(db, `competitions/${competitionId}/Skins/${CompId}`);
  
      // Use the `increment` function to increment the score by 1
      await updateDoc(skinDocRef, {
        score: increment(1)
      });
  
      console.log("Updated Score successfully");
    } catch (error) {
      console.error("Error updating skin score:", error);
    }
  };

  



export const getAllComps = async () => {
    try {
        var Competitions = []
        
        const snapshot = await getDocs(collection(db, "competitions"))

        snapshot.forEach((doc) => {
            Competitions.push({ ...doc.data(), id: doc.id })
        })

        return Competitions
    } catch (e) {
        console.log("something went wrong" + e)
        return[]
    }
}

export const addAwpSkin = async (competition, skins = []) => {
    try {
        // console.log(competition)
        console.log(skins)
        const docRef = await addDoc(collection(db, "competitions", "AWP", "Skins"), competition)
        console.log("added skin successfully..." + docRef.id)
        if(docRef.id) { //added projects successfully
            skins.forEach(async (skin) => {
                //first upload image
                console.log("uploading skin..." + skin)
                const imageUrl = await uploadToStorage(skin.imageUrl, `skins/${docRef.id}_${skin.title}`)
                //add skins as sub collection to project
                console.log("IMAGE: " + imageUrl)
                const skinRef = await addDoc(collection(db, `competitions/AWP/Skins/${docRef.id}/skin`), {
                    title: skin.title,
                    imageUrl: imageUrl
                })

                console.log("added skin successfully..." + skinRef.id)
            })

            return true 
        } else {
            return false
        }

    } catch (e) {
      console.log("something went wrong: " + e)  
    }
}

export const addM4Skin = async (competition, skins = []) => {
    try {
       
        console.log(skins)
        const docRef = await addDoc(collection(db, "competitions", "M4A4", "Skins"), competition)
        console.log("added skin successfully..." + docRef.id)
        if(docRef.id) { //added projects successfully
            skins.forEach(async (skin) => {
                //first upload image
                console.log("uploading skin..." + skin)
                const imageUrl = await uploadToStorage(skin.imageUrl, `skins/${docRef.id}_${skin.title}`)
                //add skins as sub collection to project
                console.log("IMAGE: " + imageUrl)
                const skinRef = await addDoc(collection(db, `competitions/M4A4/Skins/${docRef.id}/skin`), {
                    title: skin.title,
                    imageUrl: imageUrl
                })

                console.log("added skin successfully..." + skinRef.id)
            })

            return true 
        } else {
            return false
        }

    } catch (e) {
      console.log("something went wrong: " + e)  
    }
}

export const addAkSkin = async (competition, skins = []) => {
    try {
        // console.log(competition)
        const docRef = await addDoc(collection(db, "competitions", "AK-47", "Skins"), competition)
        console.log("added AK-47 successfully..." + docRef.id)
        if(docRef.id) {
            skins.forEach(async (skin) => {
                //first upload image
                console.log("uploading skin..." + skin)
                const imageUrl = await uploadToStorage(skin.imageUrl, `skins/${docRef.id}_${skin.title}`)
                //add skins as sub collection to project
                console.log("IMAGE: " + imageUrl)
                const skinRef = await addDoc(collection(db, `competitions/AK-47/Skins/${docRef.id}/skin`), {
                    title: skin.title,
                    imageUrl: imageUrl
                })

                console.log("added skin successfully..." + skinRef.id)
            })
            return true 
            console.log(docRef.id)
        } else {
            return false
        }

    } catch (e) {
      console.log("something went wrong: " + e)  
    }
}

