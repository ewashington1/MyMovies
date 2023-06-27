import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../firebase/UserContext';
import { fetchMovieForArray } from '../functions/fetchMovie';
import { retreiveWatchlist } from '../functions/watchlist';
import MovieCard from '../components/MovieCard';
import { getUserProfile } from '../functions/userFunctions.js';

const Watchlist = () => {

    //userId from url parameters
    const userId = useParams();

    //curUser from UserContext
    const curUser = useContext(UserContext)

    //profile, loading, and watchlist state
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [watchlist, setWatchlist] = useState([]);

    // gets the user profile and watchlist on render, depending on userId
    useEffect(() => {
        retreiveWatchlist(userId.userId)
        .then((data) => {
            setWatchlist(data);
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


    //loading, no movies, or watchlist displayed depending on whether there are movies on that watchlist
    if (loading) {
        return <div>Watchlist loading...</div>
    }
    else if (!loading && watchlist.length != 0 && userProfile) {
        return (
            <>
                <div className='ml-2'>{userProfile.name}'s Watchlist</div>

                <div className='grid grid-cols-4 gap-4'>
                    {watchlist.map((movie) => {
                        return <MovieCard className="col-span-1" key={movie.id} movie={movie} />
                    }
                    )}
                </div>
            </>
        )
    }
    else {
        return (
            <div>There are no movies on this watchlist.</div>
        )
    }
}

export default Watchlist