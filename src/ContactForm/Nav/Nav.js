import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default class Nav extends React.Component {
  render() {
    return (
      <div className="nav-container">
        <Link className="nav" to="/">Back to Contact Form</Link>
      </div>
    )
  }
}
