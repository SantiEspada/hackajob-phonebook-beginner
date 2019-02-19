import React, { Component } from 'react';

import Header from 'components/Header';
import List from 'components/List';

import { API_ENDPOINT, FILTER_NAME, ORDER_ASC } from 'constants.js';

import './App.css';

class App extends Component {
  state = {
    showSearch: false,
    showFilters: false,
    searchText: '',
    filterBy: FILTER_NAME,
    orderBy: ORDER_ASC,
    contacts: [],
    expandedContacts: [],
    loading: true,
  }

  async componentDidMount() {
    const response = await fetch(API_ENDPOINT);
    const { contacts: rawContacts } = await response.json();

    const contacts = rawContacts.map((contact, key) => ({
      ...contact,
      key,
      toggleExpanded: () => this.toggleExpandedContact(key)
    }));

    this.setState({
      contacts,
      loading: false,
    });
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

  handleFilter = (e) => {
    if(e.target && typeof e.target.value !== 'undefined') {
      this.setState({
        filterBy: e.target.value,
        showFilters: false,
      });
    }
  }

  handleOrder= (e) => {
    if(e.target && typeof e.target.value !== 'undefined') {
      this.setState({
        orderBy: e.target.value,
        showFilters: false,
      });
    }
  }

  toggleExpandedContact = (key) => {
    const {
      expandedContacts: oldExpandedContacts,
    } = this.state;

    const findIndex = oldExpandedContacts.findIndex(contact => contact === key);
    const expandedContacts = [...oldExpandedContacts];
    if(findIndex === -1) {
      expandedContacts.push(key);
    } else {
      expandedContacts.splice(findIndex, 1);
    }

    this.setState({
      expandedContacts,
    });
  }

  render() {
    const {
      showSearch,
      searchText,
      showFilters,
      filterBy,
      orderBy,
      contacts,
      expandedContacts,
      loading,
    } = this.state;

    const filteredContacts = contacts; // TODO: filter
    const mustGroup = filterBy === FILTER_NAME;

    return (
      <div className='App'>
        <Header
          showSearch={showSearch}
          searchText={searchText}
          showFilters={showFilters}
          filterBy={filterBy}
          orderBy={orderBy}
          toggleSearch={this.toggleSearch}
          toggleFilters={this.toggleFilters}
          handleSearch={this.handleSearch}
          handleFilter={this.handleFilter}
          handleOrder={this.handleOrder}
        />
        <List
          contacts={filteredContacts}
          mustGroup={mustGroup}
          expanded={expandedContacts}
          toggleExpanded={this.toggleExpandedContact}
          loading={loading}
        />
      </div>
    )
  }
}

export default App;
