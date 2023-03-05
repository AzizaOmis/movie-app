import React from 'react';

import Api from '../../services/api';
import { MyTabs } from '../../services/custom-components';
import Error from '../../services/error';
import './app.css';
import SearchTab from '../search-tab';
import RatedTab from '../rated-tab';
import { GenreContext } from '../genre-context';

export default class App extends React.Component {
  _search = 'Search';
  _rated = 'Rated';
  state = {
    tab: this._search,
    guestSessionId: null,
    error: false,
  };
  componentDidMount() {
    this.Api = new Api();
    this.Api.getGuestSessionId()
      .then((res) => {
        if (!res.success) throw false;
        const guestSessionId = res.guest_session_id;
        this.setState({ guestSessionId: guestSessionId });
      })
      .catch(this.onError);
    this.Api.getGenreList()
      .then((res) => {
        this.genreList = [...res];
      })
      .catch(this.onError);
  }
  onTabsChange = (activeKey) => {
    this.setState((state) => {
      if (state.tab !== activeKey) {
        return { tab: activeKey };
      }
    });
  };
  onError = () => {
    this.setState({ error: true });
  };
  render() {
    const { tab, guestSessionId, error } = this.state;
    const search = tab === this._search ? <SearchTab Api={this.Api} guestSessionId={guestSessionId} /> : null;
    const rated = tab === this._rated ? <RatedTab Api={this.Api} guestSessionId={guestSessionId} /> : null;
    const view = error ? (
      <Error serverErr={true} />
    ) : (
      <GenreContext.Provider value={this.genreList}>
        <MyTabs activeKey={tab} onTabsChange={this.onTabsChange} />
        {search}
        {rated}
      </GenreContext.Provider>
    );
    return <section className="movies">{view}</section>;
  }
}
