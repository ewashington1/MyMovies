import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { searchResults } from '../functions/fetchMovie';
import MovieCard from '../components/MovieCard';

const SearchResults = () => {

    //searchResult and loading state for rendering
    const [searchRes, setSearchRes] = useState(null);
    const [loading, setLoading] = useState(true);

    //with underscores is for my url, with percents is for fetching from TMDB API
    const searchTermWUnderscores = useParams();
    const searchTermWPercents = searchTermWUnderscores.searchTerm.replace(/_+/g, '%');

    useEffect(() => {
        searchResults(searchTermWPercents)
            .then((response) => {
                setSearchRes(response.results);
                setLoading(false);
            })
    }, [searchTermWPercents])

    //will only render loading state is false and searchResults has results
    if (loading) {
        return <div>Search loading...</div>
    }
    else if (!loading && searchRes.length != 0) {
        return (
            <div>
                <div className=' text-xl ml-2'>Search results for {searchTermWUnderscores.searchTerm.replace(/_+/g, ' ')}</div>
                <div className='grid grid-cols-4 gap-4'>
                    {searchRes.map((movie) => (
                        <MovieCard className="col-span-1" key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        )
    }
    else {
        return <div>Hmmm... Looks like there are no results for your search.</div>
    }
    
}

export default SearchResults