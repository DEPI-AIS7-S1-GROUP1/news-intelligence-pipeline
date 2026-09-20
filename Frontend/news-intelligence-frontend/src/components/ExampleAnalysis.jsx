import { useRef, useEffect } from 'react';
import { Newspaper, Bot, Calendar, Building2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ExampleAnalysis.css';

gsap.registerPlugin(ScrollTrigger);

const ExampleAnalysis = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const comparisonRef = useRef(null);

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

      gsap.from(comparisonRef.current.children, {
        scrollTrigger: {
          trigger: comparisonRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="example-analysis" ref={sectionRef}>
      <div className="example-analysis-container">
        <div className="section-header" ref={headerRef}>
          <span className="section-label">Example</span>
          <h2 className="section-title">Real Analysis in Action</h2>
          <p className="section-description">
            See how News Intelligence transforms a news article into structured data
          </p>
        </div>

        <div className="analysis-comparison" ref={comparisonRef}>
          <div className="article-side">
            <div className="side-header">
              <div className="side-icon">
                <Newspaper size={20} />
              </div>
              <span className="side-label">Source Article</span>
            </div>
            <div className="article-content">
              <h3 className="article-headline">
                Major Tech Company Announces Breakthrough in Quantum Computing Research
              </h3>
              <div className="article-meta">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>November 15, 2026</span>
                </div>
                <div className="meta-item">
                  <Building2 size={16} />
                  <span>Tech News Daily</span>
                </div>
              </div>
              <p className="article-body">
                Scientists at QuantumTech have successfully demonstrated a new quantum processor 
                capable of maintaining coherence for unprecedented durations. The breakthrough, 
                announced at the International Computing Conference in Boston, represents a 
                significant step toward practical quantum computing applications.
                <br/><br/>
                Dr. Sarah Chen, lead researcher on the project, explained that the team achieved 
                coherence times exceeding five minutes, a dramatic improvement over previous 
                records. "This extends the window for quantum calculations substantially," Chen 
                stated, "opening possibilities for complex algorithms previously thought impossible."
                <br/><br/>
                Industry analysts suggest this development could accelerate commercial quantum 
                computing adoption, with potential applications in drug discovery, cryptography, 
                and optimization problems affecting logistics and finance.
              </p>
            </div>
          </div>

          <div className="analysis-side">
            <div className="side-header">
              <div className="side-icon">
                <Bot size={20} />
              </div>
              <span className="side-label">AI Analysis Output</span>
            </div>
            <div className="analysis-results">
              <div className="result-block">
                <h4 className="result-title">Summary</h4>
                <p className="result-value">
                  QuantumTech announces breakthrough in quantum processor coherence times, 
                  achieving five-minute durations that could enable practical quantum computing 
                  applications in multiple industries.
                </p>
              </div>

              <div className="result-block">
                <h4 className="result-title">Sentiment</h4>
                <div className="sentiment-indicator">
                  <div className="sentiment-dot"></div>
                  <span className="sentiment-text">Positive (85% confidence)</span>
                </div>
              </div>

              <div className="result-block">
                <h4 className="result-title">Categories</h4>
                <div className="tags-container">
                  <span className="result-tag">Technology</span>
                  <span className="result-tag">Science</span>
                  <span className="result-tag">Research & Development</span>
                </div>
              </div>

              <div className="result-block">
                <h4 className="result-title">Key Entities</h4>
                <p className="result-value">
                  <strong>Organization:</strong> QuantumTech, International Computing Conference
                  <br/>
                  <strong>Person:</strong> Dr. Sarah Chen
                  <br/>
                  <strong>Location:</strong> Boston
                  <br/>
                  <strong>Technology:</strong> Quantum Processor, Quantum Computing
                </p>
              </div>

              <div className="result-block">
                <h4 className="result-title">Impact Assessment</h4>
                <p className="result-value">
                  High-impact technological advancement with commercial implications across 
                  pharmaceutical, cybersecurity, and financial sectors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleAnalysis;
