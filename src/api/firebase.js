import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    setDoc,
    doc,
    getDoc,
    Timestamp,
    where,
    query,
    updateDoc,
    deleteDoc
} from "firebase/firestore";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: "skutan-788d7",
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: "1:585546096610:web:a8999543054cb06f9de3bb",
    measurementId: "G-2R10RWV4GN"
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export const addData = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "Event"), {
            name: data.name,
            boat: data.boat,
            beer: data.beer,
            drink: data.drink,
            wine: data.wine,
            soda: data.soda
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const updateData = async (id, data) => {
    const docRef = await updateDoc(doc(db, "passengers", id), {
        name: data.name,
        boatSmall: data.boatSmall,
        boatLarge: data.boatLarge,
        beer: data.beer,
        drink: data.drink,
        wine: data.wine,
        soda: data.soda,
    });
    console.log("Document written with ID: ", docRef);
}

export const readData = async () => {
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

export const newEvent = async (eventName) => {
    try {
        const docRef = await addDoc(collection(db, 'events'), {
            name: eventName,
            date: Timestamp.now()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const getAllEvents = async () => {
    // Query a reference to a subcollection
    const querySnapshot = await getDocs(collection(db, 'events'));

    console.log(querySnapshot)
    const data = []
    await querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());

        data.push({id: doc.id, data: doc.data()})
    });

    return data
}

export const addNewPassenger = async (passengerName, eventID) => {
    try {
        const docRef = await addDoc(collection(db, 'passengers'), {
            eventID: eventID,
            name: passengerName,
            date: Timestamp.now()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const removePassenger = async (passengerID) => {
    await deleteDoc(doc(db, "passengers", passengerID))
}

export const removeEvent = async (eventID) => {
    await deleteDoc(doc(db, "events", eventID))
}

export const getPassengers = async (eventID) => {
    // Query a reference to a subcollection
    const q = query(collection(db, "passengers"), where("eventID", "==", eventID));
    const querySnapshot = await getDocs(q)

    console.log(querySnapshot)

    const data = []
    await querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());

        data.push({id: doc.id, data: doc.data()})
    });

    return data
}