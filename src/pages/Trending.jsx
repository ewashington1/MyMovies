import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import options from '../tmbd';

//simply renders trending list from TMDB API
const Trending = () => {
    const [trending, setTrending] = useState([]);

    useEffect(() => {       
        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then(response => response.json())
        .then((data) => {
            console.log(data); 
            setTrending(data.results);
        })
        .catch(err => console.error(err));
    }, []);
    
  return (
    <div>
        <div className='pl-1 text-xl ml-2 pb-2 text-slate-100 bg-slate-400 rounded-md'>Trending Today</div>
        <div className='grid grid-cols-4 gap-4'>
            {trending.map((movie) => (
                <MovieCard className="col-span-1" key={movie.id} movie={movie} />
            ))}
        </div>
    </div>
  )
}

export default Trending