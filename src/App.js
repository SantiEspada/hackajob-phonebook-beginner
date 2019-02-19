import React, { Component } from 'react';

import Header from 'components/Header';

import { FILTER_NAME, ORDER_ASC } from 'constants.js';

import './App.css';

class App extends Component {
  state = {
    showSearch: false,
    showFilters: false,
    searchText: '',
    filterBy: FILTER_NAME,
    orderBy: ORDER_ASC,
  }

  toggleSearch = () => {
    const {
      showSearch,
      showFilters,
    } = this.state;

    this.setState({
      showFilters: showFilters && showSearch,
      showSearch: !showSearch,
    });
  }

  toggleFilters = () => {
    const {
      showSearch,
      showFilters,
    } = this.state;

    this.setState({
      showSearch: showSearch && showFilters,
      showFilters: !showFilters,
    });
  }

  handleSearch = (e) => {
    if(e.target && typeof e.target.value !== 'undefined') {
      this.setState({
        searchText: e.target.value,
      });
    }
  }

  render() {
    const {
      showSearch,
      searchText,
      showFilters,
    } = this.state;

    return (
      <div className='App'>
        <Header
          showSearch={showSearch}
          searchText={searchText}
          showFilters={showFilters}
          handleSearch={this.handleSearch}
          toggleSearch={this.toggleSearch}
          toggleFilters={this.toggleFilters}
        />
      </div>
    )
  }
}

export default App;
