import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FinalCTA.css';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(Array.from(contentRef.current.children), {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-scene final-cta-scene" id="final-cta" ref={sectionRef}>
      <div className="scene-container final-cta-container" ref={contentRef}>
        <div className="cta-tag">
          <span className="cta-red-dot" />
          <span className="tag-mono">05 · LIVE SYSTEM READY</span>
        </div>

        <h2 className="cta-headline">
          Transform News Into Intelligence.
        </h2>

        <p className="cta-subtext">
          Run your first article through our AI classification pipeline. Extract categories, entities, and sentiment in seconds.
        </p>

        <div className="cta-action-wrap">
          <Link to="/analyze" className="cta-btn-primary">
            <span>LAUNCH CLASSIFIER</span>
            <span className="btn-arrow">→</span>
          </Link>
        </div>

        <div className="cta-tech-specs">
          <span className="spec-item">FASTAPI ENGINE</span>
          <span className="spec-bullet">•</span>
          <span className="spec-item">NO SIGNUP REQUIRED</span>
          <span className="spec-bullet">•</span>
          <span className="spec-item">INSTANT RESPONSE</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
