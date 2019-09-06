import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Articles from './components/articles';
import Authors from './components/authors';
import DetailsPage from './components/detailspage';
import './App.css';
const App = () => (

  <Router>
    <div  className="App">
      <header>
        <h5>ARTICLES ABOUT</h5>
        <h1>COMPUTERS & INTERNET</h1> 
        <ul>
          <li>
            <Link to="/"> Articles </Link>
          </li>
          <li>
            <Link to="/authors"> Authors </Link>
          </li>
        </ul>
      </header>
      <Route exact path="/" component={Articles} />
      <Route path="/authors" component={Authors} />
      <Route path="/detailspage/:id" component={DetailsPage} />

    </div>

  </Router>
);

export default App;
