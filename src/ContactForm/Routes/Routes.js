import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
//import ContactForm from '../ContactForm';
import ContactFormFields from '../ContactFormFields/ContactFormFields';
import ContactFormSuccessMsg from '../ContactFormSuccessMsg/ContactFormSuccessMsg';
import Nav from '../Nav/Nav';


export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ContactFormFields}></Route>
        <React.Fragment>
          <Nav />
          <Route path="/contact-form-success" component={ContactFormSuccessMsg}></Route>
        </React.Fragment>
      </Switch>
    </Router>  
  )
}