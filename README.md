# MyMovies

## Deployment

The app is deployed on Vercel. You can access it at [https://mymovies-lcf2x3ua0-ewashington1.vercel.app].

This app is built using React, The Movie Database API, Firebase Firestore, and Vercel. It allows users to browse trending movies, rate movies, and add movies to their watchlist.

## Features

- Login/signup creation: Users can create an account and sign in to access additional features.
- Home Page: The home page displays trending movies and upcoming movies. Rating is disable on upcoming movies.
- Rating: Users can rate movies by clicking on the stars on each movie card. The average rating is displayed on the each card and more details are listed on the movie detail page.
- Watchlist: Users can add movies to their watchlist by clicking on the checkbox on each movie card. The watchlist can be accessed from the user's profile page.
- Movie Detail Page: The movie detail page displays detailed information about the movie, including its release date and average rating. Users can rate the movie and add it to their watchlist from this page.
- User Profile Page: The user profile page displays the user's ratings and watchlist. Users can edit their profile information if they are signed in.
- Search: Users can search for movies using the search bar. Adult movies are filtered out of the search results.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- The Movie Database API: An API that provides movie and TV show data.
- Firebase Firestore: A NoSQL cloud database for storing and syncing data in real-time.
- Vercel: A platform for deploying and hosting web applications.
