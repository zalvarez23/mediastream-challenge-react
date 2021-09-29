/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";

export default function Exercise02() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [genres, setGenres] = useState([])
  const [filterGenre, setFilterGenre] = useState('Comedy')
  const [orderValue, setOrderValue] = useState('Descending')


  const handleMovieFetch = () => {
    setLoading(true)
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  const orderingMovies = () => {
    setOrderValue(orderValue === "Descending" ? "Ascending" : "Descending")
  }

  useEffect(() => {
    orderValue === 'Ascending' ?
      setMovies(movies.sort((a, b) => a.year - b.year)) :
      setMovies(movies.sort((a, b) => b.year - a.year))
  }, [orderValue])

  const handleGenresFetch = (params) => {
    fetch('http://localhost:3001/genres')
      .then(res => res.json())
      .then(json => {
        setGenres(json)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  useEffect(() => {
    handleGenresFetch()
    handleMovieFetch()
  }, [])

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions">
        <select name="genre" placeholder="Search by genre..." onChange={(e) => setFilterGenre(e.target.value)}>
          {
            genres.map(genre => <option value={genre} >{genre}</option>)
          }
        </select>
        <button onClick={orderingMovies}>Year  {orderValue}</button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies
            .filter(movie => movie.genres.includes(filterGenre))
            .map(movie => (
              <li key={movie.id} className="movie-library__card" style={{
                backgroundImage: `url(${movie.posterUrl})`,
                backgroundColor: 'rgb(100,100,100)',
                backgroundBlendMode: 'soft-light'
              }}>
                {/* <img src={movie.posterUrl} alt={movie.title} /> */}
                <ul className="movie-library__text">
                  <li className="title">Title: {movie.title}</li>
                  <li className="subTitle">Genres: {movie.genres.join(', ')}</li>
                  <li className="year">{movie.year}</li>
                </ul>
              </li>
            ))}
        </ul>
      )
      }
    </section >
  )
}