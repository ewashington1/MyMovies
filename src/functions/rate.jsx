import {addDoc, collection, getDocs, query, where, deleteDoc, doc, updateDoc, getDoc} from "firebase/firestore"
import { auth, db } from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth";
import { fetchMovieForArray } from "./fetchMovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const rate = async (e, movie, currentTarget, curUser) => {
    e.preventDefault();

    if (curUser == null) {
        alert("You must be signed in to rate a movie.");
        return -1;
    }

    //gets reference to ratings collection
    const ratingsRef = collection(db, "ratings");
    
    //querys to see if user already rated the same movie
    const matchingReview = query(ratingsRef, 
        where("userId", "==", auth.currentUser.uid), 
        where("movieId", "==", movie.id));

    //getting the docs with the matching review
    const matchingDocResponse = await getDocs(matchingReview);
 
    //getting the specific doc, as an array of docs is returned
    const matchingDoc = matchingDocResponse.docs[0];


    //if there were no results in the query, just add the rating
    if (matchingDoc == null) {
        try {
            await addRatingDoc();
        }
        catch (addError) {
            console.log("Error adding document: ", addError);               
        }
    }
    //otherwise, update the rating
    else {
        try {
            await updateRatingDoc();
        }
        catch (updateError) {
            console.log("Error updating document: ", updateError);
        }
    }

    //add rating function
    async function addRatingDoc() {
        //reference to new document
        const docRef = await addDoc(collection(db, "ratings"), {
            userId: auth.currentUser.uid,
            rating: parseInt(currentTarget.id),
            movieId: movie.id
        });
        console.log("Document written with id: ", docRef.id);

        alert(`You've rated ${movie.original_title} ${currentTarget.id} stars!`);
    }

    //update rating function
    async function updateRatingDoc() {
        //updating the doc using doc.ref
        const docRef = await updateDoc(matchingDoc.ref, {
            rating: parseInt(currentTarget.id)
        })

        alert(`You've updated your rating to ${currentTarget.id} stars!`);
    }
};

const getCurrentRating = async (movie, curUser) => {
    if (curUser == null) {
        return 0;
    }

    //gets reference to ratings collection
    const ratingsRef = collection(db, "ratings");
    
    //querys to see if user already rated the same movie
    const matchingReview = query(ratingsRef, 
        where("userId", "==", auth.currentUser.uid), 
        where("movieId", "==", movie.id));

    //getting the docs with the matching review
    const matchingDocResponse = await getDocs(matchingReview);
 
    //getting the specific doc, as an array of docs is returned
    const matchingDoc = matchingDocResponse.docs[0];
    
    

    if (matchingDoc) {
        const ratingData = matchingDoc.data();
        return ratingData.rating;
    }
    else {
        return 0;
    }
}

const retreiveRatings = async(_userId) => {
    let ratingIds = [];

    const ratingQuery = query(collection(db, "ratings"), where("userId", "==", _userId));

    const ratingDocsResponse = await getDocs(ratingQuery);

    const ratingDocs = ratingDocsResponse.docs;

    ratingDocs.forEach((doc) => {
        ratingIds.push(doc.data().movieId);
    });

    //maps each id to a fetchMovie call (returns promises)
    const promises = ratingIds.map((id) => {
        return fetchMovieForArray(id);
    });
    
    //waits for all promises to resolve and return the result
    const rating = await Promise.all(promises);

    return rating;
}

//calculates how many stars to fill based on current rating
const starRender = (setCurRating, curRating, movie, curUser) => {
    let result= [];

    let start = 1;

    while (start <= curRating) {
        result.push(<button key={start} id={start} onClick={(e) => {
            const rating = e.currentTarget.id;
            rate(e, movie, e.currentTarget, curUser).then((response) => {
                if (response != -1) {
                    setCurRating(rating);
                }
            });
        }
    }><FontAwesomeIcon icon="fa-solid fa-star" /></button>);
        start += 1;
    }
    while (start <= 5) {
        result.push(<button key={start} id={start} onClick={(e) => {
            const rating = e.currentTarget.id;
            rate(e, movie, e.currentTarget, curUser).then((response) => {
                if (response != -1) {
                    setCurRating(rating);
                }
            });
        }
    }><FontAwesomeIcon icon="fa-regular fa-star" /></button>);
        start += 1;
    }

    return (result)
}



export {rate, getCurrentRating, retreiveRatings, starRender};