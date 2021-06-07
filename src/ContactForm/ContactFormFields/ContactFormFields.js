import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
import db from '../../firebase/db';
//import ReCAPTCHA from 'react-google-recaptcha';
import './ContactFormFields.css';

export default class ContactFormFields extends Component {
  state = {
    name: '',
    email: '',
    message: ''
  }

  // componentDidMount() {
  //   // GET REALTIME UPDATES FOR COLLECTION
  //   this.unsubscribe = db.collection('contactForms')
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot((data) => {
  //       const contactForms = data.docs.map(doc => {
  //         return {
  //           id: doc.id,
  //           ...doc.data()
  //         };
  //       });

  //       // this.setState({
  //       //   contactForms
  //       // })
  //     });
  // };

  // componentWillUnmount() {
  //   if (this.unsubscribe) {
  //     this.unsubscribe();
  //   };
  // };

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
  }

  onChange = (value) => {
    console.log("Captcha value: ", value);
  }

  render() {
    //const RECAPTCHA_KEY = '6Ld1LRgbAAAAAF7NfxP-FrnTmRQANyUl1tFxkDdc';

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
          {/*<ReCAPTCHA
            sitekey={RECAPTCHA_KEY}
            onChange={this.onChange}
          />*/}
          <button className="btn-grad" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

//export default withRouter(ContactFormFields);