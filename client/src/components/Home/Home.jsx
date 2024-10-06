import React from 'react';
import './Home.css';

const Home = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
      Instagram Clone
    </a>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/login">Login</a>
      </li>
      <li>
        <a href="/signup">Sign Up</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li>
    </ul>
  </div>
</nav>
);
};

export default Home;