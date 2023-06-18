import { Timestamp, addDoc, collection, doc, getDocs, orderBy, query, setDoc, ref, onValue, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../firebase"


//--USER COLLCTION
export const createUserInDb = async (email, rank, username, uid) => {

    try {
        console.log("creating user in db..." + uid);
        const docRef = await setDoc(doc(db, "users", uid), {
            email,
            rank,
            username,
            createdAt: Timestamp.now()
        })
        // console.log("user added doc id" + docRef.id);

    } catch (e) {
        console.log("something went wromg: " + e)
    }

}


export const addAwpSkin = async (competition) => {
    try {
        // console.log(competition)
        const docRef = await addDoc(collection(db, "competitions", "AWP", "Skins"), competition, serverTimestamp())
        console.log("added project successfully..." + docRef.id)
        if(docRef.id) {
            return true 
            console.log(docRef.id)
        } else {
            return false
        }

    } catch (e) {
      console.log("something went wrong: " + e)  
    }
}

//ADD M$
export const addM4Skin = async (competition) => {
    try {
        // console.log(competition)
        const docRef = await addDoc(collection(db, "competitions", "M4A4", "Skins"), competition)
        console.log("added M4A4 successfully..." + docRef.id)
        if(docRef.id) {
            return true 
            console.log(docRef.id)
        } else {
            return false
        }

    } catch (e) {
      console.log("something went wrong: " + e)  
    }
}

//ak add
export const addAkSkin = async (competition) => {
    try {
        // console.log(competition)
        const docRef = await addDoc(collection(db, "competitions", "AK-47", "Skins"), competition)
        console.log("added AK-47 successfully..." + docRef.id)
        if(docRef.id) {
            return true 
            console.log(docRef.id)
        } else {
            return false
        }

    } catch (e) {
      console.log("something went wrong: " + e)  
    }
}



//KEEP HERE FOR TESTING


// export const getAllCompetitionsFromCollection = async () => {
//     try {
//         var competitions = []
        
//         const snapshot = await getDocs(collection(db, "competitions"))

//         //here is a way to order by when getting the data from db
//         // const snapshot = await getDocs( query( collection(db, "competitions"), orderBy("year", "desc")))


//         snapshot.forEach((doc) => {
//             // console.log(doc.id, "=> ", doc.data())

//             competitions.push(doc.data())
//             // competitions.push({...doc.data(), id: doc.id})   //this is to get the id for the competition if i want to edit anything 

//         })
//         return competitions
//     } catch (e) {
//         console.log("something went wrong" + e)
//         return[]
//     }
// }






export const getAwp = async () => {
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

export const getM4 = async () => {
    try {
        var Competitions = []
        
        const snapshot = await getDocs(collection(db, "competitions", "M4A4", "Skins"))

        snapshot.forEach((doc) => {
            Competitions.push({ ...doc.data(), id: doc.id })
        })

        return Competitions
    } catch (e) {
        console.log("something went wrong" + e)
        return[]
    }
}

export const getAk = async () => {
    try {
        var Competitions = []
        
        const snapshot = await getDocs(collection(db, "competitions", "AK-47", "Skins"))

        snapshot.forEach((doc) => {
            Competitions.push({ ...doc.data(), id: doc.id })
        })

        return Competitions
    } catch (e) {
        console.log("something went wrong" + e)
        return[]
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