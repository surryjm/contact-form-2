import React from 'react';
import './ContactFormSuccessMsg.css';

export default class ContactFormSuccessMsg extends React.Component {

  render() {
    return (
      <div className="contact-form-container">
        <h2>Thank you!</h2>
        <p>We'll be in touch with you shortly.</p>
      </div>
    )
  }
}