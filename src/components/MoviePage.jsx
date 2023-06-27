import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import options from '../tmbd'
import {rate, getCurrentRating} from "../functions/rate"
import {addToWatchlist, checkIfOnWatchlist, removeFromWatchlist} from "../functions/watchlist"
import { fetchMovie } from '../functions/fetchMovie'
import { useContext } from 'react'
import { UserContext } from '../firebase/UserContext'
import RatingBar from './RatingBar'
import { addOrRemove } from '../functions/watchlist'
import { starRender } from '../functions/rate'

const MoviePage = () => {

    //getting current user ofapp
    const curUser = useContext(UserContext);

    //getting movieId from url
    const {movieId} = useParams();

    //using states for movie, whether it's on watchlist, and the your current rating
    const [movie, setMovie] = useState(null);
    const [onWatchlist, setOnWatchlist] = useState(null);
    const [curRating, setCurRating] = useState(null);
    const [loading, setLoading] = useState(true);

    //fetching movie from tmbd -- dependent on movieId
    useEffect(() => {
        fetchMovie(movieId)
        .then((data) => {
            if (data.id) {
                setMovie(data);
            }
            setLoading(false);       
        }).catch((err) => console.log(err))
    }, [movieId]);

    //checking if the movie is on the watchlist already and setting onWatchlist if true
    //also gets the current rating
    useEffect(() => {
        if (movie) {
            checkIfOnWatchlist(movie, curUser)
            .then((data) => {
                setOnWatchlist(data);
            })
            .catch(error => console.error(error));

            getCurrentRating(movie, curUser)
            .then((data) => {
                setCurRating(data);
            })
        }
    }, [movie]);


    // Get the current date
    const currentDate = new Date();
    
    // Convert the movie release date to a Date object
    let releaseDate = null;

    if (movie) {
        releaseDate = new Date(movie.release_date)
    }

    //will indicate whether loading, movie exists, or movie doesn't exist. Won't allow ratings of unreleased movies
    if (loading) {
      return <div className='mt-2 ml-2'>Loading...</div>;
    } else if (!loading && movie && releaseDate && releaseDate <= currentDate) {
        return (
            <div className='ml-2 mt-2'>
                <div className='text-2xl font-bold'>{movie.original_title}</div>
                <div>{movie.overview}</div>
                <div className=' font-bold inline-block'>Released on: <div className='inline-block font-normal'>{releaseDate.toDateString().substring(4,20)}</div></div>
                <br />
                <div className=' font-bold inline-block'>Average rating: <div className='inline-block font-normal'>{movie.vote_average}/10 &nbsp;</div></div>
                <RatingBar averageRating={movie.vote_average} />
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" />
                

                <div>Rate this movie: &nbsp;
                    {starRender(setCurRating, curRating, movie, curUser)}
                </div>

                {addOrRemove(movie, onWatchlist, setOnWatchlist, curUser)}

            </div>


        )
    }
    else if (!loading && movie && releaseDate) {
        return (
            <div className='ml-2 mt-2'>
                <div className='text-2xl font-bold'>{movie.original_title}</div>
                <div>{movie.overview}</div>
                <div className=' font-bold inline-block'>Release date: <div className='inline-block font-normal'>{releaseDate.toDateString().substring(4,20)}</div></div>
                <br />
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" />

                {addOrRemove(movie, onWatchlist, setOnWatchlist, curUser)}

            </div>
        )
    }
    else {
        return (
            <div className='ml-2 mt-2'>Movie not found...</div>
        )
    }
}

export default MoviePage