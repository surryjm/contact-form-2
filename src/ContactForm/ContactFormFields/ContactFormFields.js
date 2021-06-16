import axios from 'axios';
import React, { Component } from 'react';
import db from '../../firebase/db';
import './ContactFormFields.css';
import ReCAPTCHA from 'react-google-recaptcha';


export default class ContactFormFields extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    recaptchaValue: ''
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onChange = (recaptchaValue) => {
    console.log("Captcha value:", recaptchaValue);
    this.setState({
      recaptchaValue: recaptchaValue
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.recaptchaValue === "") {
      alert("Please verify you are not a robot before clicking submit.")
    };

    // Verify reCaptcha
    axios({
      method: 'post',
      url: '/.netlify/functions/verify-recaptcha',
      data: {
        recaptchaValue: this.state.recaptchaValue
      }
    })
    .then((response) => {
      console.log(response);
      if (response.data.success === false) {
        return;
      } else {
        this.addToDb();
      }
    })
    .catch((error) => {
      console.log('Captcha error: ' + error);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    });
  };

  // Add to database
  addToDb = () => {
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
    this.sendEmail();
  };

  // Send email notification
  sendEmail = () => {
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
      console.log(response.status);
    })
    .catch((error) => {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    });
  }

  render() {
    const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

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
          <ReCAPTCHA
            sitekey={SITE_KEY}
            onChange={this.onChange}
          />
          <button className="btn-grad" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}