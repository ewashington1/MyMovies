import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SignIn from "./pages/SignIn"
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import SignUp from "./pages/SignUp"
import MoviePage from './components/MoviePage';
import { importLogos } from './fontAwesome';
import TopRated from './pages/TopRated';
import { UserContext } from './firebase/userContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Profile from './pages/Profile';
import Watchlist from './pages/Watchlist';
import RatingList from './pages/RatingList';
import Trending from './pages/Trending';
import SearchResults from './pages/SearchResults';

function App() {
  //imports needed logos and sets user on start
  useEffect(() => {
    importLogos();
    onAuthStateChanged(auth, (userResponse) => {
      setUser(userResponse);
      setLoading(false);
    });
  }, [])

  //current user and loading states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  if (loading) {
    return ( 
      <>
        <Navbar />
        <div>Loading...</div>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        {/* provides the current user to all children (including deep children)*/}
        <UserContext.Provider value={user}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<HomePage />}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/movie/:movieId" element={<MoviePage />} />
            <Route path="/toprated" element={<TopRated />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/watchlist/:userId" element={<Watchlist />}/>
            <Route path="/ratings/:userId" element={<RatingList/>} />
            <Route path="/search/:searchTerm" element={<SearchResults/>} />
          </Routes>
        </UserContext.Provider>
        
      </>
    )
  }
}

export default App
