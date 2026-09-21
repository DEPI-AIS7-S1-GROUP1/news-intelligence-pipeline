import { useEffect, useState } from 'react';
import './SectionNavigator.css';

const SectionNavigator = ({ sections }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="section-navigator" aria-label="Section navigation">
      <ul className="nav-list">
        {sections.map((section, index) => {
          const isActive = activeIndex === index;
          const numberString = (index + 1).toString().padStart(2, '0');

          return (
            <li key={section.id} className={`nav-item ${isActive ? 'active' : ''}`}>
              <button
                type="button"
                className="nav-button"
                onClick={() => scrollToSection(section.id)}
                aria-label={`Go to section ${numberString}: ${section.label}`}
                title={section.label}
              >
                {isActive && <span className="active-indicator-line" />}
                <span className="nav-number">{numberString}</span>
                <span className="nav-label-tooltip">{section.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SectionNavigator;
