import React from 'react';
import classNames from 'classnames';

import { GenreContext } from '../../context';
import { MyRate, MySpin } from '../AntdCustomComponents';

import './Movie.css';

export default class Movie extends React.Component {
  state = {
    imgIsLoading: true,
    rate: 0,
  };
  componentDidMount() {
    if (this.props.movieData.rating) {
      this.setState({ rate: this.props.movieData.rating });
    }
  }
  onload = () => {
    this.setState({ imgIsLoading: false });
  };
  onRateChange = (value) => {
    const { movieData, Api, guestSessionId } = this.props;
    Api.postRating(guestSessionId, movieData.id, value);
    this.setState({ rate: value });
  };
  render() {
    const genreList = this.context;
    const { title, release_date, overview, poster_path, genre_ids, vote_average } = this.props.movieData;
    const { imgIsLoading, rate } = this.state;
    const genresArr = genre_ids.reduce((acc, id) => {
      acc.push(genreList.find((item) => item.id === id));
      return acc;
    }, []);
    const genres = genresArr.map((item) => {
      return (
        <li key={item.id}>
          <div className="movie__genre">{item.name}</div>
        </li>
      );
    });
    const spin = imgIsLoading ? (
      <div className="movie__spin">
        <MySpin />
      </div>
    ) : null;
    const className = classNames({
      movie__rating: true,
      bad__rating: vote_average < 3,
      average__rating: vote_average >= 3 && vote_average < 5,
      good__rating: vote_average >= 5 && vote_average < 7,
      excellent__rating: vote_average >= 7,
    });
    return (
      <div className="movie">
        <div className="movie__poster">
          {spin}
          <img className="movie__img" src={poster_path} onLoad={this.onload} />
        </div>
        <div className="movie__container">
          <div className="movie__about">
            <h5 className="movie__title">{title}</h5>
            <div className={className}>{vote_average}</div>
            <span className="movie__release-date">{release_date}</span>
            <ul className="movie__genre-list">{genres}</ul>
          </div>
          <p className="movie__overview">{overview}</p>
          <MyRate onRateChange={this.onRateChange} value={rate} />
        </div>
      </div>
    );
  }
}
Movie.contextType = GenreContext;
