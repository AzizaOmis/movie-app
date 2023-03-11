import React from 'react';

import { GenreContext } from '../../context';
import Api from '../../services/Api';
import CustomError from '../CustomError';
import CustomTabs from '../CustomTabs/CustomTabs';
import RatedTab from '../RatedTab';
import SearchTab from '../SearchTab';

import './App.css';

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
      <CustomError serverErr={true} />
    ) : (
      <GenreContext.Provider value={this.genreList}>
        <CustomTabs activeKey={tab} onTabsChange={this.onTabsChange} />
        {search}
        {rated}
      </GenreContext.Provider>
    );
    return <section className="movies">{view}</section>;
  }
}
