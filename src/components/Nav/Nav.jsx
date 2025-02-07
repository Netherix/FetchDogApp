import './Nav.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Nav() {
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
        <li onClick={() => navigate('/match')}>Matched Dog</li>
        <li onClick={() => navigate('/logout')}>Logout</li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        <p>Show Menu</p>
      </div>
      {menuOpen && (
        <div className="popup-menu">
          <div className="popup-close" onClick={toggleMenu}>×</div>
          <ul className="popup-links">
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/')}>Shop Now</li>
            <li onClick={() => navigate('/')}>Contact Us</li>
            <li onClick={() => navigate('/')}>Track Your Order</li>
            <li onClick={() => navigate('/')}>About</li>
            <li onClick={toggleMenu}>Close</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Nav;
