import React, { useState } from 'react'
import { editUserProfile } from '../functions/userFunctions';

const EditProfileForm = ({profile}) => {

    //using states for form fields
    const [name, setName] = useState(profile.name);
    const [movie, setMovie] = useState(profile.movie);
    const [character, setCharacter] = useState(profile.character);
    const [quote, setQuote] = useState(profile.quote);

    //submission handling
    const handleSubmit = (e) => {
        e.preventDefault();

        editUserProfile(profile.uid, name, movie, character, quote)
    }

    return (
        <div className='border-2 border-slate-500 mr-2'>
            
            <form onSubmit={(e) => handleSubmit(e)} className='m-1'>
                <div className='underline font-bold'>Edit Profile:</div>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input className="border rounded-md" value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" />
                </div>

                <div>
                    <label htmlFor='movie'>Favorite movie:</label>
                    <input className="border rounded-md" value={movie} onChange={(e)=>setMovie(e.target.value)} type="text" id="movie" />
                </div>
                
                <div>
                    <label htmlFor='character'>Favorite character:</label>
                    <input className="border rounded-md" value={character} onChange={(e)=>setCharacter(e.target.value)} type="text" id="character" />
                </div>

                <div>
                    <label htmlFor='quote'>Favorite quote:</label>
                    <input className=" border rounded-md" value={quote} onChange={(e)=>setQuote(e.target.value)} type="text" id="quote" />
                </div>

                <button className=" border p-[3px] border-black rounded-md bg-slate-500"type='submit'>Confirm Edits</button>
            </form>
        </div>
        
    )
}

export default EditProfileForm