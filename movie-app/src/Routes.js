import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';

function Routing() {

    return (
        <Routes>
            <Route exact path="/">
                <Login />
            </Route>

            <Route exact path="/register">
                <Register />
            </Route>
        </Routes>
    );
}

export default Routing;