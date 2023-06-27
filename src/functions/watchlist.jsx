import {addDoc, collection, getDocs, query, where, deleteDoc, doc} from "firebase/firestore"
import { auth, db} from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth";
import { fetchMovieForArray } from "./fetchMovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const addToWatchlist = async (e, movie, curUser) => {
    e.preventDefault();

    if (curUser== null) {
        alert("You must be signed in to add a movie to your watchlist.")
        //0 represents false in this case, for use in MoviePage.jsx
        return 0;
    }
    try {
        //adding the document, while getting the reference to it
        const docRef = await addDoc(collection(db, "watchlist"), {
            userId: auth.currentUser.uid,
            movieId: movie.id
        });
        console.log("Document written with id: ", docRef.id);

        alert(`You've added ${movie.original_title} to your watchlist!`);
    }
    catch (error) {
        console.log("Error adding document: ", error);
    }

}

const removeFromWatchlist = async (e, movie, curUser) =>{
    e.preventDefault();

    if (curUser== null) {
        alert("You must be signed in to remove a movie from your watchlist.")
        //0 represents false in this case, for use in MoviePage.jsx
        return 0;
    }

    try {
        //getting the watchlist document we want to remove
        const watchlistRef = collection(db, "watchlist");
        const matchingEntry = query(watchlistRef, 
            where("userId", "==", auth.currentUser.uid),
            where("movieId", "==", movie.id));

        const matchingDocs = await getDocs(matchingEntry);
        const matchingDocId = (matchingDocs.docs)[0].id;

        //removing doc from watchlist
        deleteDoc(doc(db, "watchlist", matchingDocId));

        alert("Removed from watchlist.");
    }
    catch (error) {
        console.log(error);
    }
}

const checkIfOnWatchlist = async(movie, curUser) => {

    if (curUser== null) {
        return false;
    }
    try {        
        //checking if this movie is already on the watchlist
        const watchlistRef = collection(db, "watchlist");
        const matchingEntry = query(watchlistRef, 
            where("userId", "==", auth.currentUser.uid),
            where("movieId", "==", movie.id));


        const matchingDocs = await getDocs(matchingEntry);
        const matchingDoc = (matchingDocs.docs)[0];

        if (matchingDoc != null) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("Error checking if movie is already on watchlist.")
    }
}

const retreiveWatchlist = async(_userId) => {
    let watchlistIds = [];

    const watchlistQuery = query(collection(db, "watchlist"), where("userId", "==", _userId));

    const watchlistDocsResponse = await getDocs(watchlistQuery);

    const watchlistDocs = watchlistDocsResponse.docs;

    watchlistDocs.forEach((doc) => {
        watchlistIds.push(doc.data().movieId);
    });

    const promises = watchlistIds.map((id) => {
        return fetchMovieForArray(id);
    });
    
    const watchlist = await Promise.all(promises);

    return watchlist;
}

//will have a filled check if already on watchlist
const addOrRemove = (movie, onWatchlist, setOnWatchlist, curUser) => {
    if (onWatchlist) {
        return (
            <button onClick={(e) => {
                removeFromWatchlist(e, movie, curUser);
                setOnWatchlist(!onWatchlist);
            }
            }>
                <div className="inline-block font-bold">Remove from watchlist:</div> <FontAwesomeIcon icon="fa-solid fa-square-check" />
            </button>
        )
    }
    else {
        return (
            <button onClick={(e) => {
                addToWatchlist(e, movie, curUser).then((response) => {
                    if (response != 0) {
                        setOnWatchlist(!onWatchlist);
                    }
                })
            }
            }>
                <div className="inline-block font-bold">Add to watchlist:</div> <FontAwesomeIcon icon="fa-regular fa-square-check" />
            </button>
        )
    }
}

export {addToWatchlist, removeFromWatchlist, checkIfOnWatchlist, retreiveWatchlist, addOrRemove}