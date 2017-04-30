import React, { Component } from 'react';
import loginSVG from '../log_in.svg';

/**
 * Our login page
 * Has a login button that hit's the login url
 */
export default class Login extends Component {
  constructor(props) {
    super();
    this.buttonWrapperStyle = {
      background: 'rgba(255, 255, 255, 0.701961)',
      overflow: 'hidden',
      padding: '40px',
      margin: '0 auto',
      display: 'block',
      width: '400px',
      textAlign: 'center',
      marginTop: '80px',
    };
  }

  render() {
    return (
      <div className="login">
        <a style={this.buttonWrapperStyle} href="/login" dangerouslySetInnerHTML={{__html: loginSVG}}></a>
      </div>
    );
  }
}
