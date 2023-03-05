import React from 'react';

import Movie from '../movie';
import './movie-list.css';

export default function MovieList({ data, guestSessionId, Api }) {
  let movies = data.map((item) => {
    return (
      <li key={item.id} className="movies__item">
        <Movie movieData={item} guestSessionId={guestSessionId} Api={Api} />
      </li>
    );
  });
  return <ul className="movies__list"> {movies} </ul>;
}
