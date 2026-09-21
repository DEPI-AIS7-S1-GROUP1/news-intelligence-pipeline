import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-minimal">
      <div className="footer-container">
        <div className="footer-left">
          <Link to="/" className="footer-brand">
            CLASSIFY<span className="logo-dot">.</span>
          </Link>
          <span className="footer-sub">AI ARTICLE CLASSIFICATION API ENGINE</span>
        </div>

        <div className="footer-right">
          <Link to="/analyze" className="footer-link">TRY CLASSIFIER</Link>
          <a href="#how-it-works" className="footer-link">PIPELINE</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GITHUB</a>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p className="footer-copy">
          © {new Date().getFullYear()} CLASSIFY API. BUILT WITH REACT + FASTAPI + LLM ENGINE.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
