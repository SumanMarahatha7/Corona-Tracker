import React from 'react';
import './App.css';
import Home from './pages/Home.js';
import Country from './pages/Country.js';
import CountrySingle from './pages/CountrySingle.js';
import News from './pages/News.js';
import {Switch, Redirect, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <div className="container-fluid">
    <Navbar />
    <center><h1>Welcome to Corona Tracker</h1></center>
    <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/country" exact component={Country} />
    <Route path="/country/:id" component={CountrySingle} />
    <Route path="/news" exact component={News} />
    <Redirect to="/" />
    </Switch>
    </div>
  );
}

export default App;
