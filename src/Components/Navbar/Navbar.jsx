import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/images/socar.png';
import profile from '../../assets/images/profile.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faChartLine, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(prevState => !prevState);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img className="navbar-logo" src={logo} alt="Logo" />
        <div className="navbar-title">POLİMER ÜRETİM ÇİZELGESİ</div>
      </div>
      <div className="navbar-right">
        <Link className="navbar-button" to="/">
          <FontAwesomeIcon icon={faHome} />
          Ana Sayfa
        </Link>
        
        <div className="navbar-dropdown" ref={dropdownRef}>
          <button className="navbar-button dropdown-toggle" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faList} />
            Raporlar
            <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
          </button>
          <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
            <Link className="dropdown-item" to="/list">
              <FontAwesomeIcon icon={faList} />
              Uyum Takibi
            </Link>
            <Link className="dropdown-item" to="/chart">
              <FontAwesomeIcon icon={faChartLine} />
              Uyum Çizelgesi
            </Link>
          </div>
        </div>
        
        <div className="navbar-profile">
          <div className="navbar-profile-name">Username</div>
          <img className="navbar-profile-img" src={profile} alt="Profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
