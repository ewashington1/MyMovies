import { addDoc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config";
import { collection, setDoc, doc } from "firebase/firestore";

const createUserProfile = async (_email, _uid) => {
    try {
        const newProfileRef = await setDoc(doc(db, "users", _uid), {
            character: "{Character}",
            quote: "{Quote}",
            email: _email,
            name: "{Name}",
            uid: _uid,
            movie: "{Movie}"
        });
    }
    catch (err) {
        console.log(err);
    }
}

const getUserProfile = async (_uid) => {
    try {
        const userRef = await getDoc(doc(db, "users", _uid));
        return userRef.data();
    }
    catch (err) {
        console.log(err);
    }
}

const editUserProfile = async(_uid, _name, _movie, _character, _quote) => {
    try {
        const userRef = doc(db, "users", _uid);
        
        await updateDoc(userRef, {
            name: _name,
            movie: _movie,
            character: _character,
            quote: _quote
        });
        alert("Successfully updated profile. Refresh to see changes in effect.")
    }
    catch (err) {
        console.log(err);
    }
    
}



export {createUserProfile, getUserProfile, editUserProfile}