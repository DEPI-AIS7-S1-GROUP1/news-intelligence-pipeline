import { useRef, useEffect } from 'react';
import { FileText, Database, Cpu, Package } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TechStack.css';

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const flowRef = useRef(null);

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

      const layers = flowRef.current.querySelectorAll('.stack-layer');
      const arrows = flowRef.current.querySelectorAll('.flow-arrow');

      gsap.from(layers, {
        scrollTrigger: {
          trigger: flowRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from(arrows, {
        scrollTrigger: {
          trigger: flowRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.15,
        delay: 0.3,
        ease: 'back.out(2)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="tech-stack" ref={sectionRef}>
      <div className="tech-stack-container">
        <div className="section-header" ref={headerRef}>
          <span className="section-label">Technology</span>
          <h2 className="section-title">Built on Modern Architecture</h2>
          <p className="section-description">
            Full-stack solution combining React frontend with FastAPI backend and AI/NLP processing
          </p>
        </div>

        <div className="stack-flow" ref={flowRef}>
          <div className="stack-layer">
            <div className="layer-icon">
              <FileText size={28} />
            </div>
            <h3 className="layer-title">Frontend</h3>
            <p className="layer-tech">React + Vite</p>
            <p className="layer-description">
              Modern component-based UI with fast development and optimized builds
            </p>
          </div>

          <div className="flow-arrow">→</div>

          <div className="stack-layer">
            <div className="layer-icon">
              <Database size={28} />
            </div>
            <h3 className="layer-title">API Layer</h3>
            <p className="layer-tech">FastAPI + Python</p>
            <p className="layer-description">
              High-performance RESTful API with automatic documentation and validation
            </p>
          </div>

          <div className="flow-arrow">→</div>

          <div className="stack-layer">
            <div className="layer-icon">
              <Cpu size={28} />
            </div>
            <h3 className="layer-title">AI/NLP</h3>
            <p className="layer-tech">Groq + LLMs</p>
            <p className="layer-description">
              Advanced language models for understanding, classification, and extraction
            </p>
          </div>

          <div className="flow-arrow">→</div>

          <div className="stack-layer">
            <div className="layer-icon">
              <Package size={28} />
            </div>
            <h3 className="layer-title">Results</h3>
            <p className="layer-tech">Structured JSON</p>
            <p className="layer-description">
              Clean, typed data ready for storage, visualization, or further processing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
