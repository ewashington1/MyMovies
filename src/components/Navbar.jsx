import React, {useState, useEffect}  from 'react'
import {Link} from "react-router-dom"
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';

const Navbar = () => {

  //authenticed user and state for whether dropdown in "down"
    const [authUser, setAuthUser] = useState(null);
    const [dropdown, setDropdown] = useState(null);

    //event listener to change sign out to sign in when needed
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthUser(user);
          } else {
            setAuthUser(null);
          }
        });
        return () => {
          listen();
        };
    }, [authUser]);

    //function for signing out user
    const userSignOut = () => {
        signOut(auth)
        .then(() => {
          console.log("Sign out successful");
          setAuthUser(null);
        })
        .catch((error) => console.log(error));
    };

    //event handler for the dropdown menu
    const handleDropdownClick = (e) => {
      e.preventDefault();
      if (!dropdown) {
        const dropdownContent = (
          <div className="absolute pl-5 pr-5 pb-2 rounded-bl-md rounded-br-md bg-slate-700 right-2 transform translate-y-3">
            <nav className="">
              <ul>
                <li className="text-slate-300 border-b">
                  <Link to={`/profile/${authUser.uid}`}>My Profile</Link>
                </li>
                <li className="text-slate-300 border-b">
                  <Link to={`/watchlist/${authUser.uid}`}>My Watchlist</Link>
                </li>
                <li className="text-slate-300 border-b">
                  <Link to={`/ratings/${authUser.uid}`}>My Ratings</Link>
                </li>
                <li>
                  <button className='text-slate-300 pr-2' onClick={userSignOut}>Sign Out</button>
                </li>
              </ul>
            </nav>
          </div>
        )

        setDropdown(dropdownContent);
      }
      else {
        setDropdown(null);
      }
    }

    return (
        <div className="flex items-center h-12 bg-slate-700 justify-between">
          <div className='flex'>
            <div className="flex text-slate-300 h-full font-bold underline pl-5">MyMovies</div>
            <div className='pl-5 pr-5 h-full'>
              <Link to="/" className="h-full pl-5 pr-5 bg-slate-800 rounded-md text-slate-300 ">Home</Link>
            </div>
            <div className='pl-5 pr-5 h-full'>
              <Link to="/toprated" className=" text-slate-300 h-full pl-5 pr-5 rounded-md bg-slate-800">Top Rated</Link>
            </div>
            <div className='pl-5 pr-5 h-full'>
              <Link to="/trending" className=" text-slate-300 h-full pl-5 pr-5 rounded-md bg-slate-800">Trending</Link>
            </div>
            <div>
              <SearchBar />
            </div>
            
            
          </div>
            
            {/* conditionally renders sign out or sign in whether user is signed in */}
          {authUser ? (
              <div className='relative'>
                  <p className='text-slate-300 pr-2'>Signed in as {authUser.email}
                    &nbsp;
                    <button className=' bg-slate-300 rounded-md' onClick={(e) =>handleDropdownClick(e)}>
                      <FontAwesomeIcon icon="fa-solid fa-caret-down"  className=' text-slate-700 pl-1 pr-1'/>
                    </button> 
                  </p>
                  {dropdown}
              </div>
              ) : (
                  <Link to="/signin" className="text-slate-300 float-right pr-2">Sign In</Link>
                )
          }
        </div>
    )
}

export default Navbar