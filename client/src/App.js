import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CreateBook from './components/CreateBook';

function App() {
  return (
    <div className="App">
       <Router>
        <div>
          <Route exact path='/' component={CreateBook} />
        </div>
      </Router>
    </div>
  );
}

export default App;
