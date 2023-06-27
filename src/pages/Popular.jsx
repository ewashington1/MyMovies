import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import options from '../tmbd';

//simply renders popular list from TMDB API
const Popular = () => {
    const [popular, setPopular] = useState([]);

    useEffect(() => {          
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then((data) => {
            setPopular(data.results);
        })
        .catch(err => console.error(err));
    }, []);
    
  return (
    <div>
        <div className='pl-1 text-xl ml-2 pb-2 text-slate-100 bg-slate-400 rounded-md'>Popular</div>
        <div className='grid grid-cols-4 gap-4'>
            {popular.map((movie) => (
                <MovieCard className="col-span-1" key={movie.id} movie={movie} />
            ))}
        </div>
    </div>
  )
}

export default Popular