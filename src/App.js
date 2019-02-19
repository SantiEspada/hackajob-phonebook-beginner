import React, { Component } from 'react';

import Logo from 'components/Logo';

import './App.css';

class App extends Component {
    render() {
        return (
            <div class='App'>
                <Logo color='darkgray' />
                <h1>Phonebook App</h1>
            </div>
        )
    }
}

export default App;
