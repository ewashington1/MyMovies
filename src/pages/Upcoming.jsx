import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import options from '../tmbd';

//Upcoming doesn't work as intended because The Movie Database API isn't up to date. They have released movies in their upcoming list
//The way I could fix this is by making a function called getUnreleased that conditionally (based on whether the movie was released)
//adds a movie to the return array (basically filters out the ones that have been released). You would then use the returned array
//instead of the upcoming array in this function.

//simply renders upcoming list from TMDB API
const Upcoming = () => {
    const [upcoming, setUpcoming] = useState([]);

    useEffect(() => {          
        fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
        .then(response => response.json())
        .then((data) => {
            setUpcoming(data.results);
        })
        .catch(err => console.error(err));
    }, []);
    
  return (
    <div>
        <div className='pl-1 text-xl ml-2 pb-2  text-slate-100 bg-slate-400 rounded-md'>Upcoming</div>
        <div className='grid grid-cols-4 gap-4'>
            {upcoming.map((movie) => (
                <MovieCard className="col-span-1" key={movie.id} movie={movie} />
            ))}
        </div>
    </div>
  )
}

export default Upcoming