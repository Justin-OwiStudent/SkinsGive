import { Timestamp, addDoc, collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { db } from "../firebase"


//--USER COLLCTION
export const createUserInDb = async (username, email, uid) => {

    try {
        console.log("creating user in db..." + uid);
        const docRef = await setDoc(doc(db, "users", uid), {
            username,
            email,
            rank: "dmg",
            createdAt: Timestamp.now()
        })

    } catch (e) {
        console.log("something went wromg: " + e)
    }

}


export const addCompetitionCollection = async (competition) => {
    try {
        // console.log(competition)
        const docRef = await addDoc(collection(db, "competitions"), competition)
        console.log("added project successfully..." + docRef.id)
        if(docRef.id) {
            return true 
        } else {
            return false
        }

    } catch (e) {
      console.log("something went wrong: " + e)  
    }
}

export const getAllCompetitionsFromCollection = async () => {
    try {
        var competitions = []
        
        const snapshot = await getDocs(collection(db, "competitions"))

        //here is a way to order by when getting the data from db
        // const snapshot = await getDocs( query( collection(db, "competitions"), orderBy("year", "desc")))


        snapshot.forEach((doc) => {
            // console.log(doc.id, "=> ", doc.data())

            competitions.push(doc.data())
            // competitions.push({...doc.data(), id: doc.id})   //this is to get the id for the competition if i want to edit anything 

        })
        return competitions
    } catch (e) {
        console.log("something went wrong" + e)
        return[]
    }
}