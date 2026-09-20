import { useRef, useEffect } from 'react';
import { BarChart3, Building2, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './IntelligencePreview.css';

gsap.registerPlugin(ScrollTrigger);

const IntelligencePreview = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const metricsRef = useRef(null);
  const sentimentBarRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current && headerRef.current.children) {
        gsap.from(Array.from(headerRef.current.children), {
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
      }

      // Metrics animation
      if (metricsRef.current && metricsRef.current.children) {
        gsap.from(Array.from(metricsRef.current.children), {
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }

      // Sentiment bar fill animation
      if (sentimentBarRef.current) {
        gsap.fromTo(sentimentBarRef.current, {
          width: '0%',
        }, {
          width: '75%',
          scrollTrigger: {
            trigger: sentimentBarRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          duration: 1.2,
          ease: 'power2.out',
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="intelligence-preview" ref={sectionRef}>
      <div className="intelligence-preview-container">
        <div className="section-header" ref={headerRef}>
          <span className="section-label">Intelligence Preview</span>
          <h2 className="section-title">See AI Analysis in Action</h2>
          <p className="section-description">
            Real-time processing transforms raw news articles into structured intelligence with sentiment, entities, and contextual insights.
          </p>
        </div>

        <div className="preview-demo">
          <div className="analysis-grid" ref={metricsRef}>
            <div className="analysis-metric">
              <div className="metric-header">
                <span className="metric-label">Sentiment</span>
                <div className="metric-icon">
                  <BarChart3 size={18} />
                </div>
              </div>
              <p className="metric-value">Positive</p>
              <p className="metric-description">
                Overall tone indicates optimistic outlook with constructive framing
              </p>
              <div className="sentiment-bar">
                <div className="sentiment-fill" ref={sentimentBarRef}></div>
              </div>
            </div>

            <div className="analysis-metric">
              <div className="metric-header">
                <span className="metric-label">Key Entities</span>
                <div className="metric-icon">
                  <Building2 size={18} />
                </div>
              </div>
              <p className="metric-value">8 Detected</p>
              <p className="metric-description">
                Organizations, people, and locations extracted
              </p>
              <div className="entities-list">
                <span className="entity-tag">OpenAI</span>
                <span className="entity-tag">Microsoft</span>
                <span className="entity-tag">Sam Altman</span>
                <span className="entity-tag">Silicon Valley</span>
              </div>
            </div>

            <div className="analysis-metric">
              <div className="metric-header">
                <span className="metric-label">Category</span>
                <div className="metric-icon">
                  <Target size={18} />
                </div>
              </div>
              <p className="metric-value">Technology</p>
              <p className="metric-description">
                Primary: AI/Machine Learning<br/>
                Secondary: Business Strategy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligencePreview;
