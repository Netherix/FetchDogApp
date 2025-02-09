import './Nav.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";

function Nav({ handleMatch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="nav">
      <ul className="nav-links">
        <li onClick={() => navigate('/search')}>Home/Search</li>
        <li onClick={() => navigate('/favorites')}>Favorite Dogs</li>
        <li onClick={handleMatch}>Matched Dog</li>
        <li onClick={() => navigate('/logout')}>Logout</li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        <p>Show Menu</p>
      </div>
      {menuOpen && (
        <div className="popup-menu">
          <div className="popup-close" onClick={toggleMenu}>×</div>
          <ul className="popup-links">
            <li onClick={() => navigate('/search')}>Home/Search</li>
            <li onClick={() => navigate('/favorites')}>Favorite Dogs</li>
            <li onClick={handleMatch}>Matched Dog</li>
            <li onClick={() => navigate('/logout')}>Logout</li>
            <li onClick={toggleMenu}>Close</li>
          </ul>
        </div>
      )}
    </div>
  );
}

Nav.propTypes = {
  handleMatch: PropTypes.func.isRequired
}

export default Nav;
