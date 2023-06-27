import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../firebase/userContext';
import {retreiveRatings} from "../functions/rate"
import MovieCard from '../components/MovieCard';
import { getUserProfile } from '../functions/userFunctions.js';


const RatingList = () => {

    //getting userId from params
    const userId = useParams();

    //getting user from context
    const curUser = useContext(UserContext);

    //states for profile, loading, and list for rendering
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ratingList, setRatingList] = useState([]);

    //getting rating and profile on render, depending on userId
    useEffect(() => {
        retreiveRatings(userId.userId)
        .then((data) => {
            setRatingList(data);
            setLoading(false);
        })
        .catch((err) => console.log(err));

        getUserProfile(userId.userId)
        .then((response) => {
            setUserProfile(response);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [userId]);


    
    if (loading) {
        return <div>Rating list loading...</div>
    }
    else if (!loading && ratingList.length != 0 && userProfile) {
        return (
            <>
                <div className='ml-2'>{userProfile.name}'s Ratings</div>

                <div className='grid grid-cols-4 gap-4'>
                    {/* maybe put in Name's watchlist*/}
                    {ratingList.map((movie) => {
                        return <MovieCard className="col-span-1" key={movie.id} movie={movie} />
                    }
                    )}
                </div>
            </>

            
        )
    }
    else {
        return (
            <div>There are no movies on this rating list.</div>
        )
    }
}

export default RatingList