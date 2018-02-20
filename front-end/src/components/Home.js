import React, { Component } from 'react';
import Register from './Register';
import Login from './Login';

class Home extends Component {
    render() {
        return (
            <div>
                <Register />
                <Login />
            </div>
        );
    }
}

export default Home;