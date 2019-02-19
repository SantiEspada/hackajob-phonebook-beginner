import React from 'react';

import Logo from 'components/Logo';

import {
  FILTER_NAME,
  FILTER_ADDRESS,
  FILTER_PHONE,
  ORDER_ASC,
  ORDER_DESC
} from 'constants.js';

import './Header.css';

const Header = ({
  showSearch,
  showFilters,
  toggleSearch,
  toggleFilters,
  searchText,
  filterBy,
  orderBy,
  handleSearch,
  handleFilter,
  handleOrder
}) => (
  <div className='Header__Wrapper'>
    <header className='Header'>
      <Logo color='darkgray' size={28} />
      <h1 className='Header__Title'>
        Phonebook
      </h1>
      <nav className='Header__Nav'>
        <button className='Header__Nav__Item' onClick={toggleSearch}>
          <span role='img' aria-label='Toggle search bar'>{showSearch ? '❌' : '🔍'}</span>
        </button>
        <button className='Header__Nav__Item' onClick={toggleFilters}>
          <span role='img' aria-label='Toggle filters selection'>{showFilters ? '❌' : '✨'}</span>
        </button>
      </nav>
    </header>
    <form className={`Header__Search ${!showSearch && 'hidden'}`} onSubmit={handleSearch}>
      <input
        className='Header__Search__Input'
        type='search'
        onChange={handleSearch}
        value={searchText}
        placeholder='Search by name, address or phone number...'
      />
    </form>
    <div className={`Header__Filters ${!showFilters && 'hidden'}`}>
      <select
        value={filterBy}
        onChange={handleFilter}
        title='Filter by'
        aria-label='Filter by'
      >
        <option value={FILTER_NAME}>Name</option>
        <option value={FILTER_ADDRESS}>Address</option>
        <option value={FILTER_PHONE}>Phone number</option>
      </select>
      <select
        value={orderBy}
        onChange={handleOrder}
        title='Order by'
        aria-label='Order'
      >
        {/* Disable rule as it enforces emojis being wrapped in <span>,
            which is not valid as an <option> children */}
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <option value={ORDER_ASC} role='img' aria-label='Ascending'>⬆️</option>
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <option value={ORDER_DESC} role='img' aria-label='Descending'>⬇️</option>
      </select>
    </div>
  </div>
);

export default Header;
