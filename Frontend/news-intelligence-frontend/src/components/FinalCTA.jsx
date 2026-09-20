import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FinalCTA.css';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="final-cta" ref={sectionRef}>
      <div className="final-cta-container" ref={contentRef}>
        <div className="cta-badge">
          <div className="cta-pulse"></div>
          Ready to Start
        </div>
        <h2 className="cta-headline">
          Transform News Into Intelligence
        </h2>
        <p className="cta-subtext">
          Start analyzing articles with AI-powered insights. Extract structured intelligence from any news source in seconds.
        </p>
        <div className="cta-buttons">
          <Link to="/analyze" className="cta-button cta-button-primary">
            Start Analyzing Now
            <ArrowRight size={24} />
          </Link>
        </div>
        <p className="cta-note">
          No signup required • Instant results • Free to use
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
