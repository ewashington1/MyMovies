import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../firebase/userContext'
import { query, where, collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Link, useParams } from 'react-router-dom';
import { getUserProfile } from '../functions/userFunctions';
import EditProfileForm from '../components/EditProfileForm';

const Profile = () => {

    //gets curUser from context
    const curUser = useContext(UserContext);

    //gets userId from url
    const profileUid = useParams();

    //profile and loading state for rendering
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    //for share profile link
    const currentURL = window.location.href

    const findUserProfile = async () => {
        try {
            const matchingProfileDoc = await getDoc(doc(db, "users", profileUid.uid));

            const matchingUserProfile = matchingProfileDoc.data();

            setUserProfile(matchingUserProfile);
            setLoading(false);
        }
        catch (err) {
            console.log(err);
        }
        
        
    }

    //finds profile upon rendering, depending on changes of profileUid
    useEffect(() => {
        findUserProfile();
    }, [profileUid]);
    

    if (loading) {
        return (
            <div>Retreiving profile data...</div>
        )
    }
    else if (userProfile && !loading){
        return (
            <div className=' ml-2'>
                <div className='font-bold'>Name: <span className=' font-normal'>{userProfile.name}</span></div>
                <div className='font-bold'>Favorite movie: <span className=' font-normal'>{userProfile.movie}</span></div>
                <div className='font-bold'>Favorite character: <span className=' font-normal'>{userProfile.character}</span></div>
                <div className='font-bold'>Favorite quote: <span className=' font-normal'>"{userProfile.quote}"</span></div>
                <Link className='font-semibold text-blue-500 underline' to={`/watchlist/${userProfile.uid}`}>{`${userProfile.name}'s Watchlist`}</Link>
                <br />
                <Link className='font-semibold text-blue-500 underline' to={`/ratings/${userProfile.uid}`}>{`${userProfile.name}'s Rating List`}</Link>
                <div className='font-bold'>Share this profile: <Link to={currentURL} className='text-blue-500 font-normal underline'>{currentURL}</Link></div>

                {(curUser != null && curUser.uid==userProfile.uid) ? <EditProfileForm profile={userProfile} /> : null}
            </div>
            
        )
    }
    else {
        return (
            <div>This profile does not exist.</div>
        )
    }
    
}

export default Profile