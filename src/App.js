import React, { Component } from 'react';
import './App.css';
import { Router, Link } from "@reach/router";

const Post = ({ body }) => {
  return (
    <div>
      {body.map(post => {
        const { _id, title, content } = post;
        return (
          <div key={_id}>
            <h2>{title}</h2>
            <p>{content}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

class App extends Component {
  state = {
    isLoading: true,
    posts: [],
    error: null,
  };
  fetchPosts() {
    fetch(`/fake-data.json`)
      .then(response => response.json())
      .then(
        data =>
          this.setState({
            posts: data,
            isLoading: false,
          })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    const { isLoading, posts } = this.state;
    return (
      <React.Fragment>
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
        <h1>React Fetch - Blog</h1>
        <hr />
        {!isLoading ? Object.keys(posts).map(key => <Post key={key} body={posts[key]} />) : <h3>Loading...</h3>}
      </React.Fragment>
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
