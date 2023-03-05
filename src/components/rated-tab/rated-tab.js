import React from 'react';

import MovieList from '../movie-list';
import Error from '../../services/error';
import { MySpin } from '../../services/custom-components';

export default class RatedTab extends React.Component {
  _noData = 'noData';
  _noConnection = 'noConnection';
  _serverErr = 'serverErr';
  _noError = 'no error';
  state = {
    data: [],
    loading: true,
    error: {
      noData: false,
      noConnection: false,
      serverErr: false,
    },
  };
  componentDidMount() {
    const { guestSessionId } = this.props;
    this.getData(guestSessionId);
    this.setState({ guestSessionId: guestSessionId });
  }
  getData = (sessionId) => {
    const { Api } = this.props;
    Api.getRatedMoviesData(sessionId)
      .then((res) => {
        if (res === 0) {
          return this.dataNotFound();
        }
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
    const error = this.onError(this._noData);
    this.setState({ error: error, loading: false });
    return false;
  };
  onDataReceived = (data) => {
    this.setState({ data: data, loading: false });
  };
  onError = (err) => {
    let newErrorState;
    switch (err) {
      case this._noData:
        newErrorState = {
          noData: true,
          noConnection: false,
          serverErr: false,
        };
        break;
      case this._serverErr:
        newErrorState = {
          noData: false,
          noConnection: false,
          serverErr: true,
        };
        break;
      case this._noConnection:
        newErrorState = {
          noData: false,
          noConnection: true,
          serverErr: false,
        };
        break;
      default:
        newErrorState = {
          noData: false,
          noConnection: false,
          serverErr: false,
        };
    }
    return newErrorState;
  };
  render() {
    const { guestSessionId, Api } = this.props;
    const { data, loading, error } = this.state;
    const { noData, serverErr, noConnection } = error;
    const hasErrorAlert = noData || serverErr || noConnection;
    const spin = loading ? <MySpin /> : null;
    const err = hasErrorAlert ? <Error noData={noData} serverErr={serverErr} noConnection={noConnection} /> : null;
    const movieList =
      hasErrorAlert || loading ? null : <MovieList data={data} guestSessionId={guestSessionId} Api={Api} />;
    return (
      <React.Fragment>
        {spin}
        {err}
        {movieList}
      </React.Fragment>
    );
  }
}
