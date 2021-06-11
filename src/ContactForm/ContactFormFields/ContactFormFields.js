import axios from 'axios';
import React, { Component } from 'react';
import db from '../../firebase/db';
import './ContactFormFields.css';

export default class ContactFormFields extends Component {
  state = {
    name: '',
    email: '',
    message: ''
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    
    db.collection('contactForms')
    .add({
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
      createdAt: new Date()
    })
    .then((docRef) => {
      this.setState({
        name: '',
        email: '',
        message: ''
      });
    this.props.history.push('/contact-form-success');
    });

    axios({
      method: 'post',
      url: '/.netlify/functions/send',
      data: {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.toJSON());
    })


  }

  render() {

    return (
      <div className="contact-form-container">
        <h1>Contact</h1>
        <form onSubmit={this.onFormSubmit} method="POST">
          <ul>
            <li>
              <label htmlFor="name">Name:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </li>
            <li>
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </li>
            <li>
              <label htmlFor="msg">Message:</label>
              <textarea 
                id="msg" 
                name="message" 
                required
                value={this.state.message} 
                onChange={this.handleInputChange}
              />
            </li>
          </ul>
          <button className="btn-grad" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}