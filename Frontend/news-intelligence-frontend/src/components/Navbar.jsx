import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="brand-logo" aria-label="CLASSIFY. Homepage">
          <span className="logo-brand">CLASSIFY<span className="logo-dot">.</span></span>
          <span className="logo-sub">ARTICLE AI</span>
        </Link>

        <nav className="header-nav">
          {location.pathname === '/' ? (
            <>
              <button type="button" className="nav-link" onClick={() => scrollToSection('intelligence-preview')}>
                PREVIEW
              </button>
              <button type="button" className="nav-link" onClick={() => scrollToSection('how-it-works')}>
                PROCESS
              </button>
              <button type="button" className="nav-link" onClick={() => scrollToSection('core-capabilities')}>
                CAPABILITIES
              </button>
            </>
          ) : (
            <Link to="/" className="nav-link">
              HOME
            </Link>
          )}

          <a
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-link"
          >
            GITHUB
          </a>

          <Link to="/analyze" className="nav-action-link">
            <span className="action-text">TRY CLASSIFIER</span>
            <span className="action-arrow">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
