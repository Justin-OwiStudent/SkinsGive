import { Timestamp, addDoc, collection, doc, getDocs, orderBy, query, setDoc, ref, onValue, serverTimestamp, updateDoc } from "firebase/firestore"
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
        const docRef = await addDoc(collection(db, "competitions", "MA", "Skins"), competition)
        console.log("added skin successfully..." + docRef.id)
        if(docRef.id) { //added projects successfully
            skins.forEach(async (skin) => {
                //first upload image
                console.log("uploading skin..." + skin)
                const imageUrl = await uploadToStorage(skin.imageUrl, `skins/${docRef.id}_${skin.title}`)
                //add skins as sub collection to project
                console.log("IMAGE: " + imageUrl)
                const skinRef = await addDoc(collection(db, `competitions/MA/Skins/${docRef.id}/skin`), {
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
        const docRef = await addDoc(collection(db, "competitions", "AK", "Skins"), competition)
        console.log("added AK-47 successfully..." + docRef.id)
        if(docRef.id) {
            skins.forEach(async (skin) => {
                //first upload image
                console.log("uploading skin..." + skin)
                const imageUrl = await uploadToStorage(skin.imageUrl, `skins/${docRef.id}_${skin.title}`)
                //add skins as sub collection to project
                console.log("IMAGE: " + imageUrl)
                const skinRef = await addDoc(collection(db, `competitions/AK/Skins/${docRef.id}/skin`), {
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



export const getAwp = async (CompId) => {
    try {
        var Competitions = []
        
        const snapshot = await getDocs(collection(db, "competitions", "AWP", "Skins"))

        snapshot.forEach((doc) => {
            Competitions.push({ ...doc.data(), id: doc.id })
        })

        return Competitions
    } catch (e) {
        console.log("something went wrong" + e)
        return[]
    }
}

export const getAwpCompetition = async (CompId) => {
    try {
        var Competitions = []
        
        const snapshot = await getDocs(collection(db, "competitions", "AWP"))

        // console.log(snapshot)

        return Competitions
    } catch (e) {
        console.log("something went wrong" + e)
        return[]
    }
}

export const getAwpImage = async (CompId) => {
    try {
        var skins = []
        const snapshot = await getDocs(collection(db, `competitions/AWP/Skins/${CompId}/skin`))
        

        snapshot.forEach( (doc) => {
            skins.push(doc.data())
            
        })

        return skins
        
    } catch (e) {
        console.log("something went wrong" + e)
        return []
    }
}

export const getM4 = async () => {
    try {
        var Competitions = []
        
        const snapshot = await getDocs(collection(db, "competitions", "MA", "Skins"))

        snapshot.forEach((doc) => {
            Competitions.push({ ...doc.data(), id: doc.id })
        })

        return Competitions
    } catch (e) {
        console.log("something went wrong" + e)
        return[]
    }
}

export const getM4Image = async (CompId) => {
    try {
        var skins = []
        const snapshot = await getDocs(collection(db, `competitions/MA/Skins/${CompId}/skin`))
        

        snapshot.forEach( (doc) => {
            skins.push(doc.data())
            
        })

        return skins
        
    } catch (e) {
        console.log("something went wrong" + e)
        return []
    }
}

export const getAk = async () => {
    try {
        var Competitions = []
        
        const snapshot = await getDocs(collection(db, "competitions", "AK", "Skins"))

        snapshot.forEach((doc) => {
            Competitions.push({ ...doc.data(), id: doc.id })
        })

        return Competitions
    } catch (e) {
        console.log("something went wrong" + e)
        return[]
    }
}

export const getAKImage = async (CompId) => {
    try {
        var skins = []
        const snapshot = await getDocs(collection(db, `competitions/AK/Skins/${CompId}/skin`))
        

        snapshot.forEach( (doc) => {
            skins.push(doc.data())
            
        })

        return skins
        
    } catch (e) {
        console.log("something went wrong" + e)
        return []
    }
}


export const updateAwpScore = async (CompetitionDetails, CompId) => {
    try {

        await updateDoc(doc(db, "competitions", "AWP", "Skins", CompId), CompetitionDetails);
        console.log("updated Score success")

    } catch (e) {
        console.log("something went wrong updating")

    }
}

export const updateM4Score = async (CompetitionDetails, CompId) => {
    try {

        await updateDoc(doc(db, "competitions", "M4A4", "Skins", CompId), CompetitionDetails);
        console.log("updated Score success")

    } catch (e) {
        console.log("something went wrong updating")

    }
}

export const updateAkScore = async (CompetitionDetails, CompId) => {
    try {

        await updateDoc(doc(db, "competitions", "AK-47", "Skins", CompId), CompetitionDetails);
        console.log("updated Score success")

    } catch (e) {
        console.log("something went wrong updating")

    }
}