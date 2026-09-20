import { useRef, useEffect } from 'react';
import { FileText, Brain, Sparkles, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      const steps = stepsRef.current.querySelectorAll('.process-step');
      const arrows = stepsRef.current.querySelectorAll('.process-arrow');

      // Animate steps with stagger
      gsap.from(steps, {
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Animate arrows separately
      gsap.from(arrows, {
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.2,
        delay: 0.4,
        ease: 'back.out(2)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="how-it-works" id="how-it-works" ref={sectionRef}>
      <div className="how-it-works-container">
        <div className="section-header" ref={headerRef}>
          <span className="section-label">Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-description">
            Four-step pipeline from raw article to actionable intelligence
          </p>
        </div>

        <div className="process-steps" ref={stepsRef}>
          <div className="process-step">
            <div className="step-number">01</div>
            <div className="step-icon">
              <FileText size={32} />
            </div>
            <h3 className="step-title">Collect</h3>
            <p className="step-description">
              Input article URL or paste text. System retrieves and prepares content for processing.
            </p>
          </div>

          <div className="process-arrow">→</div>

          <div className="process-step">
            <div className="step-number">02</div>
            <div className="step-icon">
              <Brain size={32} />
            </div>
            <h3 className="step-title">Understand</h3>
            <p className="step-description">
              NLP models parse text structure, identify language patterns, and extract raw textual features.
            </p>
          </div>

          <div className="process-arrow">→</div>

          <div className="process-step">
            <div className="step-number">03</div>
            <div className="step-icon">
              <Sparkles size={32} />
            </div>
            <h3 className="step-title">Analyze</h3>
            <p className="step-description">
              AI models classify content, detect entities, measure sentiment, and identify key themes.
            </p>
          </div>

          <div className="process-arrow">→</div>

          <div className="process-step">
            <div className="step-number">04</div>
            <div className="step-icon">
              <TrendingUp size={32} />
            </div>
            <h3 className="step-title">Insights</h3>
            <p className="step-description">
              Structured results delivered with summaries, categorization, sentiment scores, and extracted entities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
