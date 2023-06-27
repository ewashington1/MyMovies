import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import options from '../tmbd';
import Trending from './Trending';
import Popular from './Popular';
import Upcoming from './Upcoming';

const HomePage = () => {
    const [trending, setTrending] = useState([]);

    useEffect(() => {          
        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then(response => response.json())
        .then((data) => {
            setTrending(data.results);
        })
        .catch(err => console.error(err));
    }, []);
    
  return (
    <div>
        <div className=' font-semibold text-2xl pl-2'>Home</div>
        <hr />
        <Trending />
        <div className='h-2'></div>
        <hr />
        <Upcoming />
    </div>
  )
}

export default HomePage