import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const steps = [
    {
      num: '01',
      title: 'COLLECT',
      tag: 'INPUT STAGE',
      description: 'Input article headline, description, author, or URL. System retrieves and pre-processes raw textual payload for analysis.'
    },
    {
      num: '02',
      title: 'UNDERSTAND',
      tag: 'NLP PARSING',
      description: 'NLP models parse text syntax, token vectors, named entities, and structural sentence patterns.'
    },
    {
      num: '03',
      title: 'ANALYZE',
      tag: 'AI INFERENCE',
      description: 'FastAPI pipeline runs multi-label classification, sentiment scoring, and key entity recognition via high-speed LLMs.'
    },
    {
      num: '04',
      title: 'INSIGHTS',
      tag: 'STRUCTURED OUTPUT',
      description: 'Delivers structured JSON output with categorized confidence ratings, extracted entities, and concise summaries.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(Array.from(headerRef.current.children), {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }

      if (gridRef.current) {
        gsap.from(Array.from(gridRef.current.children), {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
          y: 45,
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
    <section className="section-scene how-it-works-scene" id="how-it-works" ref={sectionRef}>
      <div className="scene-container">
        {/* Section Header */}
        <div className="section-header" ref={headerRef}>
          <span className="section-meta-tag">03 · ANALYSIS PIPELINE</span>
          <h2 className="scene-title">How It Works</h2>
          <p className="scene-description">
            A four-stage processing architecture transforming unstructured news text into typed intelligence data.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="steps-grid" ref={gridRef}>
          {steps.map((step, idx) => (
            <div key={step.num} className="step-card">
              <div className="step-card-header">
                <span className="step-number">{step.num}</span>
                <span className="step-tag">{step.tag}</span>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              <div className="step-card-footer">
                <span className="step-indicator-dot" />
                <span className="step-index-text">STAGE {idx + 1} OF 4</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
