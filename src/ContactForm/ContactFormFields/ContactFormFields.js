import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
import db from '../../firebase/db';

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

  render() {
    return (
      <div>
        <h1>Contact Form</h1>
        <form onSubmit={this.onFormSubmit}>
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
          <li>
            <button type="submit">Submit</button>
          </li>
        </form>
      </div>
    )
  }
}

//export default withRouter(ContactFormFields);