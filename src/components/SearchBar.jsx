import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react'
import { searchResults } from "../functions/fetchMovie";

const SearchBar = () => {
    const nav = useNavigate();

    const [input, setInput] = useState(null);

    //can't have spaces in url
    const handleSubmit = (e, searchTerm) => {
        e.preventDefault();
        const parsedTerm = searchTerm.replace(/\s+/g,"_");
        nav(`/search/${parsedTerm}`);
    }

    return (
        <div className="border-2 border-slate-300 rounded-full">
            <form onSubmit={(e) => handleSubmit(e, input)}>
                <label htmlFor="search"></label>
                <input type="text" id="search" className="text-slate-300 bg-transparent pl-2" onChange={(e) => setInput(e.target.value)} placeholder="Search"/>
            </form>
        </div>
    )
}

export default SearchBar