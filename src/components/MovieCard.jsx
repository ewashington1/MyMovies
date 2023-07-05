import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../firebase/UserContext'
import { starRender } from '../functions/rate'
import { getCurrentRating } from '../functions/rate'
import { addOrRemove, checkIfOnWatchlist } from '../functions/watchlist'
import RatingBar from './RatingBar'

const MovieCard = ({movie}) => {
    //getting the current user of the app
    const curUser = useContext(UserContext);

    //getting the current rating and whether the movie is on the watchlist
    const [curRating, setCurRating] = useState(null);
    const [onWatchlist, setOnWatchlist] = useState(null);

    //checking if on watchlist and getting current rating on render
    useEffect(() => {
        checkIfOnWatchlist(movie, curUser)
            .then((data) => {
                setOnWatchlist(data);
            })
            .catch(error => console.error(error));

        getCurrentRating(movie, curUser)
            .then((data) => {
                setCurRating(data);
            })
    }, []);

    // Get the current date
    const currentDate = new Date();
    
    // Convert the movie release date to a Date object
    const releaseDate = new Date(movie.release_date);

    //wont render rating option if it's unreleased
    if (releaseDate <= currentDate) {
        return (
            <Link to={`/movie/${movie.id}`} className=' bg-slate-200 rounded-xl'>
                <div className=" p-3 text-xs sm:text-xs md:text-base">
                    <div className=' font-bold'>{movie.original_title}</div>
                    <div>{movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}</div>
                    <div><div className='font-bold inline-block'>Released on: </div>{releaseDate.toDateString().substring(4,20)}</div>
                    <div className=' font-bold inline-block'>Average rating: <div className='inline-block font-normal'>{movie.vote_average.toFixed(1)}/10 &nbsp;</div></div>
                    <RatingBar averageRating={movie.vote_average} />
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" />
                    <div>
                        <div className='inline-block font-bold'>Rate: </div>
                        {/* Only call starRender if the release date is before the current date */}
                        {starRender(setCurRating, curRating, movie, curUser)}
                    </div>
                    {addOrRemove(movie, onWatchlist, setOnWatchlist, curUser)}
                </div>
            </Link>
        )
    } else {
        return (
            <Link to={`/movie/${movie.id}`} className=' bg-slate-200 rounded-xl'>
                <div className="p-3 text-xs sm:text-xs md:text-base">
                    <div className=' font-bold'>{movie.original_title}</div>
                    <div>{movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}</div>
                    <div><div className='font-bold inline-block'>Release date: </div>{releaseDate.toDateString().substring(4,20)}</div>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" />
                    {addOrRemove(movie, onWatchlist, setOnWatchlist, curUser)}
                </div>
            </Link>
        )
    }
    
}

export default MovieCard
