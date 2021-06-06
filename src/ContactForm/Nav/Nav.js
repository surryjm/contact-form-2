import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">Back to Contact Form</Link>
      </div>
    )
  }
}
