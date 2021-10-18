import React from 'react';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return <footer className="footerText">Copyright &copy; <a href="https://github.com/chrismochinski/magic-beans" target="_blank">Magic Beans Cryptofolio</a></footer>
}

export default Footer;
