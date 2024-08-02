import React from 'react';
import './Navbar.css';
import logo from '../../assets/images/socar.png';
import profile from '../../assets/images/profile.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img className="navbar-logo" src={logo} alt="Logo" />
        <div className="navbar-title">POLİMER ÜRETİM ÇİZELGESİ</div>
      </div>
      <div className="navbar-right">
        <Link className="navbar-link" to="/">
          <FontAwesomeIcon icon={faHome} />
          Ana Sayfa
        </Link>
        <Link className="navbar-link" to="/reports">
          <FontAwesomeIcon icon={faFileAlt} />
          Raporlar
        </Link>
        <div className="navbar-profile">
          <div className="navbar-profile-name">Username</div>
          <img className="navbar-profile-img" src={profile} alt="Profile" />
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
