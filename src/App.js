import React, { Component } from 'react';
import './App.css';
import { Router, Link } from "@reach/router";

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>{" "}
          <Link to="dashboard">City</Link>
        </nav>
    
        <Router>
          <Home path="/" />
          <Dashboard path="/dashboard" />
        </Router>
      </div>
    );
  }
}

const Home = () => (
  <div>
    <h2>Hello</h2>
  </div>
);

const Dashboard = () => (
  <div>
    <h2>Future search city</h2>
  </div>
);

export default App;
