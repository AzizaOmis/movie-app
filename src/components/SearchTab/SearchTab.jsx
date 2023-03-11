import React from 'react';

import CustomError from '../CustomError';
import CustomPagination from '../CustomPagination';
import CustomSpin from '../CustomSpin';
import MovieList from '../MovieList';
import SearchPanel from '../SearchPanel';

export default class SearchTab extends React.Component {
  _helloMessage = 'helloMessage';
  _notFound = 'notFound';
  _noConnection = 'noConnection';
  _serverErr = 'serverErr';
  _noError = 'no error';
  _searchData = 'searchData';
  state = {
    data: [],
    loading: false,
    query: null,
    page: 1,
    totalPages: null,
    error: {
      helloMessage: true,
      notFound: false,
      noConnection: false,
      serverErr: false,
    },
  };
  getData = (query, page) => {
    const { Api } = this.props;
    Api.getMoviesData(query, page)
      .then((res) => {
        if (res === 0) {
          return this.dataNotFound();
        }
        const totalPages = res.pop();
        this.setState({ totalPages: totalPages });
        return res;
      })
      .then((data) => {
        if (!data) return;
        this.onDataReceived(data);
      })
      .catch(() => {
        const error = this.onError(this._serverErr);
        this.setState({ error: error, loading: false });
      });
  };
  dataNotFound = () => {
    const error = this.onError(this._notFound);
    this.setState({ error: error, loading: false });
    return false;
  };
  onDataReceived = (data) => {
    this.setState({ data: data, loading: false });
  };
  onError = (err) => {
    let newErrorState;
    switch (err) {
      case this._notFound:
        newErrorState = {
          helloMessage: false,
          notFound: true,
          noConnection: false,
          serverErr: false,
        };
        break;
      case this._helloMessage:
        newErrorState = {
          helloMessage: true,
          notFound: false,
          noConnection: false,
          serverErr: false,
        };
        break;
      case this._serverErr:
        newErrorState = {
          helloMessage: false,
          notFound: false,
          noConnection: false,
          serverErr: true,
        };
        break;
      case this._noConnection:
        newErrorState = {
          helloMessage: false,
          notFound: false,
          noConnection: true,
          serverErr: false,
        };
        break;
      default:
        newErrorState = {
          helloMessage: false,
          notFound: false,
          noConnection: false,
          serverErr: false,
        };
    }
    return newErrorState;
  };
  getQueryValue = (value, page = 1) => {
    if (value === '' || !window.navigator.onLine) {
      return this.queryChecker();
    }
    const noError = this.onError(this._noError);
    this.setState({ query: value, page: page, loading: true, error: noError });
    this.getData(value, page);
  };
  queryChecker = () => {
    let newErrorState;
    if (!window.navigator.onLine) {
      newErrorState = this.onError(this._noConnection);
    } else {
      newErrorState = this.onError(this._helloMessage);
    }
    return this.setState({ query: null, page: 1, loading: false, error: newErrorState });
  };
  onPaginationChange = (page) => {
    this.getQueryValue(this.state.query, page);
  };
  render() {
    const { guestSessionId, Api } = this.props;
    const { data, loading, page, totalPages, error } = this.state;
    const { helloMessage, notFound, serverErr, noConnection } = error;
    const hasErrorAlert = helloMessage || notFound || serverErr || noConnection;
    const spin = loading ? <CustomSpin /> : null;
    const err = hasErrorAlert ? (
      <CustomError helloMessage={helloMessage} notFound={notFound} serverErr={serverErr} noConnection={noConnection} />
    ) : null;
    const movieList =
      hasErrorAlert || loading ? null : <MovieList data={data} guestSessionId={guestSessionId} Api={Api} />;
    const pagination = hasErrorAlert ? null : (
      <CustomPagination onPaginationChange={this.onPaginationChange} totalPages={totalPages} page={page} />
    );
    return (
      <React.Fragment>
        <SearchPanel getQueryValue={this.getQueryValue} />
        {spin}
        {err}
        {movieList}
        {pagination}
      </React.Fragment>
    );
  }
}
