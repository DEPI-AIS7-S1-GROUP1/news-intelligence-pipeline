import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CoreCapabilities.css';

gsap.registerPlugin(ScrollTrigger);

const CoreCapabilities = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  const capabilities = [
    {
      code: 'CAP-01',
      title: 'Summarization',
      description: 'Generate concise, objective summaries extracting core arguments, statements, and factual takeaways from lengthy news content.'
    },
    {
      code: 'CAP-02',
      title: 'Classification',
      description: 'Categorize articles across domains (Technology, Business, Politics, Science, Health) using multi-label confidence models.'
    },
    {
      code: 'CAP-03',
      title: 'Entity Extraction',
      description: 'Detect and map named entities including key figures, organizations, geopolitical locations, and dates.'
    },
    {
      code: 'CAP-04',
      title: 'Sentiment Analysis',
      description: 'Evaluate emotional tone, contextual bias, and overall polarity scores across text segments.'
    },
    {
      code: 'CAP-05',
      title: 'Contextual Understanding',
      description: 'Map entity relationships, detect underlying narrative implications, and identify broader sector impacts.'
    },
    {
      code: 'CAP-06',
      title: 'Actionable Insights',
      description: 'Produce high-density intelligence payload formatted into machine-readable, production-ready JSON.'
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

      if (cardsRef.current) {
        gsap.from(Array.from(cardsRef.current.children), {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-scene core-capabilities-scene" id="core-capabilities" ref={sectionRef}>
      <div className="scene-container">
        {/* Section Header */}
        <div className="section-header" ref={headerRef}>
          <span className="section-meta-tag">04 · SYSTEM CAPABILITIES</span>
          <h2 className="scene-title">What News Intelligence Can Do</h2>
          <p className="scene-description">
            Comprehensive textual analysis engineered for speed, accuracy, and structured API delivery.
          </p>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="capabilities-grid" ref={cardsRef}>
          {capabilities.map((cap) => (
            <div key={cap.code} className="capability-card">
              <div className="cap-card-header">
                <span className="cap-code">{cap.code}</span>
                <span className="cap-accent-bar" />
              </div>
              <h3 className="cap-title">{cap.title}</h3>
              <p className="cap-description">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities;
