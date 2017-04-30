import React from 'react';

function Navbar() {

  const navbarStyle = {
    flex: 1,
  };

  return (
    <nav style={navbarStyle}>
      <ul className="nav">
        <li><a href="#">Explorar</a></li>
        <li className="uk-active"><a href="#">Canciones</a></li>
        <li><a href="#">Álbumes</a></li>
        <li><a href="#">Artistas</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
