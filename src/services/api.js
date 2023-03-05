import { format } from 'date-fns';

export default class Api {
  _apiKey = 'api_key=522fbe05ef518e7d59530f31fc071040';
  _guestSessionId = 'https://api.themoviedb.org/3/authentication/guest_session/new?';
  _searchApi = 'https://api.themoviedb.org/3/search/movie?';
  _postRatingApi = 'https://api.themoviedb.org/3/movie/';
  _getRatedMovies = 'https://api.themoviedb.org/3/guest_session/';
  _posterApi = 'https://image.tmdb.org/t/p/original';
  _genres = 'https://api.themoviedb.org/3/genre/movie/list?';
  _defaultPoster =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLBqMvUe8HqP3kiuRwYm2BQq0Ew4vvwYOG4qY6cqgNZCarT2ZBCutfQpDyO18gPiw8Imk&usqp=CAU';
  getGuestSessionId = async () => {
    const guestSessionId = await fetch(this._guestSessionId + this._apiKey);
    return guestSessionId.json();
  };
  getGenreList = async () => {
    const response = await fetch(this._genres + this._apiKey);
    const responseJson = await response.json();
    const genreList = await responseJson.genres;
    return genreList;
  };
  searchMovies = async (query, page) => {
    let res = await fetch(this._searchApi + this._apiKey + '&query=' + query + '&page=' + page);
    return res.json();
  };
  getMoviesData = async (query, page) => {
    const request = await this.searchMovies(query, page);
    let resultsArr = [];
    if (request.total_results === 0) {
      return 0;
    }
    request.results.forEach((element) => {
      const { poster_path, title, release_date, overview, id, genre_ids, vote_average } = element;
      resultsArr.push({
        poster_path: poster_path ? this._posterApi + poster_path : this._defaultPoster,
        title: title,
        release_date: release_date ? format(new Date(release_date), 'MMMM dd, yyyy') : null,
        overview: this.clippingText(overview),
        id: id,
        genre_ids: [...genre_ids],
        vote_average: Number(vote_average).toFixed(1),
      });
    });
    resultsArr.push(request.total_pages);
    return resultsArr;
  };
  getRatedMovies = async (sessionId) => {
    const rated = await fetch(this._getRatedMovies + sessionId + '/rated/movies?' + this._apiKey);
    return rated.json();
  };
  getRatedMoviesData = async (sessionId) => {
    const request = await this.getRatedMovies(sessionId);
    let resultsArr = [];
    if (request.total_results === 0) {
      return 0;
    }
    request.results.forEach((element) => {
      const { poster_path, title, release_date, overview, id, genre_ids, vote_average, rating } = element;
      resultsArr.push({
        poster_path: poster_path ? this._posterApi + poster_path : this._defaultPoster,
        title: title,
        release_date: release_date ? format(new Date(release_date), 'MMMM dd, yyyy') : null,
        overview: this.clippingText(overview),
        id: id,
        genre_ids: [...genre_ids],
        vote_average: Number(vote_average).toFixed(1),
        rating: rating,
      });
    });
    return resultsArr;
  };
  postRating = async (guestSessionId, movieId, rating) => {
    const body = {
      value: rating,
    };
    await fetch(this._postRatingApi + movieId + '/rating?' + this._apiKey + '&guest_session_id=' + guestSessionId, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  };
  clippingText = (text) => {
    const arr = text.split('');
    if (arr.length >= 140) {
      let idx = arr.indexOf(' ', 139);
      if (arr[idx - 1] === ',') {
        idx -= 1;
      }
      return arr.slice(0, idx).join('') + '...';
    }
    return text;
  };
}
