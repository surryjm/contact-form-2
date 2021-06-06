import React from 'react';
import './ContactForm.css';
import ContactFormFields from './ContactFormFields/ContactFormFields';
import db from '../firebase/db';

export default class ContactForm extends React.Component {
  state = {
    contactForms: []
  }

  componentDidMount() {
    // GET DATA ONCE
    // db.collection('contactForms')
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    //     });
    //   });

    // GET REALTIME UPDATES FOR COLLECTION
    this.unsubscribe = db.collection('contactForms')
      .orderBy('createdAt', 'desc')
      .onSnapshot((data) => {
        // data.docs.forEach(doc => {
        //   console.log(doc.id, doc.data());
        // });

        const contactForms = data.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });

        this.setState({
          contactForms
        })
      });
  };

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    };
  };

  render() {
    const contactForms = this.state.contactForms
      .map(form => {
        return (
          <div key={form.id}>
            <p>{form.name}</p>
            <p>{form.email}</p>
            <p>{form.message}</p>
          </div>
        )
      })

    return (
      <div>
        <div>
          {contactForms}
        </div>
        <div>
          <ContactFormFields />
        </div>
      </div>
    )
  }
}
