import React from 'react';
// import './styles.css';
if (process.env.BROWSER) require('./styles.css');

class Contact extends React.Component {
  render() {
    return (
      <div className="ContactPage">
        <div className="ContactPage-container">
          <h1>Contact</h1>
        </div>
      </div>
    );
  }

}

export default Contact;
