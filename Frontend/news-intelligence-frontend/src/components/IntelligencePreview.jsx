import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './IntelligencePreview.css';

gsap.registerPlugin(ScrollTrigger);

const IntelligencePreview = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const metricsRef = useRef(null);
  const codePanelRef = useRef(null);
  const sentimentFillRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
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

      // Code panel animation
      if (codePanelRef.current) {
        gsap.from(codePanelRef.current, {
          scrollTrigger: {
            trigger: codePanelRef.current,
            start: 'top 75%',
          },
          y: 45,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      }

      // Metrics grid animation
      if (metricsRef.current) {
        gsap.from(Array.from(metricsRef.current.children), {
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 75%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        });
      }

      // Sentiment fill bar
      if (sentimentFillRef.current) {
        gsap.fromTo(
          sentimentFillRef.current,
          { width: '0%' },
          {
            width: '84%',
            scrollTrigger: {
              trigger: sentimentFillRef.current,
              start: 'top 85%',
            },
            duration: 1.2,
            ease: 'power2.out',
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-scene intelligence-preview-scene" id="intelligence-preview" ref={sectionRef}>
      <div className="scene-container">
        {/* Section Header */}
        <div className="section-header" ref={headerRef}>
          <span className="section-meta-tag">02 · INTELLIGENCE PREVIEW</span>
          <h2 className="scene-title">See AI Analysis in Action</h2>
          <p className="scene-description">
            Real-time inference transforms raw news text into structured intelligence with sentiment scoring, entity maps, and contextual confidence.
          </p>
        </div>

        <div className="preview-layout-grid">
          {/* Left: Code Snippet / API Request Visual */}
          <div className="api-code-panel" ref={codePanelRef}>
            <div className="panel-header">
              <span className="panel-dot red" />
              <span className="panel-dot yellow" />
              <span className="panel-dot green" />
              <span className="panel-title">POST /api/v1/classify</span>
              <span className="panel-status">200 OK</span>
            </div>

            <div className="code-content">
              <div className="code-block request-block">
                <span className="code-comment">// Input Payload</span>
                <pre>
                  <code>{`{
  "headline": "Global Markets React to Quantum Computing Breakthrough",
  "source": "Tech News Daily",
  "text": "Financial analysts predict significant shifts..."
}`}</code>
                </pre>
              </div>

              <div className="code-divider">
                <span className="divider-label">AI PROCESSING PIPELINE</span>
              </div>

              <div className="code-block response-block">
                <span className="code-comment">// API Response Output</span>
                <pre>
                  <code>{`{
  "category": "technology",
  "confidence": 0.948,
  "sentiment": "positive",
  "score": 0.84,
  "entities_count": 8
}`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Right: Metrics & Output Visualization */}
          <div className="metrics-column" ref={metricsRef}>
            {/* Sentiment Metric Card */}
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">SENTIMENT ANALYSIS</span>
                <span className="metric-badge positive">POSITIVE</span>
              </div>
              <div className="metric-score-row">
                <span className="metric-big-val">0.84</span>
                <span className="metric-sub-val">Confidence: 94.8%</span>
              </div>
              <p className="metric-explainer">
                Optimistic outlook with constructive market framing.
              </p>
              <div className="sentiment-bar-track">
                <div className="sentiment-fill" ref={sentimentFillRef} />
              </div>
            </div>

            {/* Entity Extraction Card */}
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">EXTRACTED ENTITIES</span>
                <span className="metric-badge dim">8 DETECTED</span>
              </div>
              <div className="entities-chip-grid">
                <span className="entity-chip">OpenAI</span>
                <span className="entity-chip">Microsoft</span>
                <span className="entity-chip">Sam Altman</span>
                <span className="entity-chip">QuantumTech</span>
                <span className="entity-chip">Silicon Valley</span>
                <span className="entity-chip">Boston</span>
              </div>
            </div>

            {/* Classification Category Card */}
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">PRIMARY CATEGORY</span>
                <span className="metric-badge accent">TECHNOLOGY</span>
              </div>
              <div className="category-detail">
                <div className="cat-row">
                  <span className="cat-key">Primary Topic</span>
                  <span className="cat-val">AI / Machine Learning</span>
                </div>
                <div className="cat-row">
                  <span className="cat-key">Secondary Topic</span>
                  <span className="cat-val">Markets & Finance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligencePreview;
