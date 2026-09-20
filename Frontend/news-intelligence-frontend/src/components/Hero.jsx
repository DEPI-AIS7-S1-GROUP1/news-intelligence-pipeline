import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctasRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const floatingElementsRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Main content entrance
    tl.from(headlineRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.2,
    })
    .from(subheadlineRef.current, {
      y: 40,
      opacity: 0,
      duration: 1,
    }, '-=0.6')
    .from(ctasRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
    }, '-=0.5')
    .from(card1Ref.current, {
      x: 120,
      opacity: 0,
      rotation: 12,
      duration: 1.2,
    }, '-=1')
    .from(card2Ref.current, {
      x: 140,
      opacity: 0,
      duration: 1,
    }, '-=0.8')
    .from(card3Ref.current, {
      x: 160,
      opacity: 0,
      duration: 0.8,
    }, '-=0.7');

    // Floating animations for background elements
    if (floatingElementsRef.current.length > 0) {
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: '+=30',
            x: index % 2 === 0 ? '+=20' : '-=20',
            rotation: index % 2 === 0 ? 5 : -5,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3,
          });
        }
      });
    }

    // Continuous floating for cards
    gsap.to(card1Ref.current, {
      y: '-=15',
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(card2Ref.current, {
      y: '+=12',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.5,
    });

    gsap.to(card3Ref.current, {
      y: '-=10',
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1,
    });
  }, { scope: heroRef });

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="grid-overlay"></div>
        <div className="glow-orb glow-orb-1" ref={(el) => floatingElementsRef.current[0] = el}></div>
        <div className="glow-orb glow-orb-2" ref={(el) => floatingElementsRef.current[1] = el}></div>
        
        {/* Floating decorative elements */}
        <div className="floating-shapes">
          <div className="float-shape shape-1" ref={(el) => floatingElementsRef.current[2] = el}></div>
          <div className="float-shape shape-2" ref={(el) => floatingElementsRef.current[3] = el}></div>
          <div className="float-shape shape-3" ref={(el) => floatingElementsRef.current[4] = el}></div>
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-headline" ref={headlineRef}>
            Turn News Into Intelligence.
          </h1>
          <p className="hero-subheadline" ref={subheadlineRef}>
            Analyze articles instantly with AI-powered insights. Extract key facts, sentiment, entities, and actionable intelligence from any news source.
          </p>
          <div className="hero-ctas" ref={ctasRef}>
            <Link to="/analyze" className="hero-cta-primary">
              Start Analyzing
              <ArrowRight size={20} />
            </Link>
            <a href="#how-it-works" className="hero-cta-secondary">
              Explore How It Works
              <ChevronDown size={20} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="news-card-stack">
            <div className="news-card news-card-1" ref={card1Ref}>
              <div className="ai-badge">
                <div className="ai-pulse"></div>
                AI ANALYZED
              </div>
              <div className="news-card-header">
                <div className="news-icon">TN</div>
                <div className="news-meta">
                  <p className="news-source">Tech News Daily</p>
                  <p className="news-date">2 hours ago</p>
                </div>
              </div>
              <h3 className="news-title">
                Global Markets React to New Economic Policy
              </h3>
              <p className="news-excerpt">
                Financial analysts predict significant shifts in trading patterns as new regulations take effect across major exchanges...
              </p>
              <div className="analysis-tags">
                <span className="analysis-tag">Economics</span>
                <span className="analysis-tag">Positive Sentiment</span>
                <span className="analysis-tag">High Impact</span>
              </div>
            </div>

            <div className="news-card news-card-2" ref={card2Ref}>
              <div className="news-card-header">
                <div className="news-icon">WP</div>
                <div className="news-meta">
                  <p className="news-source">World Politics</p>
                  <p className="news-date">5 hours ago</p>
                </div>
              </div>
              <h3 className="news-title">
                Climate Summit Reaches Breakthrough Agreement
              </h3>
              <p className="news-excerpt">
                Representatives from 150 nations commit to ambitious carbon reduction targets...
              </p>
              <div className="analysis-tags">
                <span className="analysis-tag">Environment</span>
                <span className="analysis-tag">Neutral</span>
              </div>
            </div>

            <div className="news-card news-card-3" ref={card3Ref}>
              <div className="news-card-header">
                <div className="news-icon">ST</div>
                <div className="news-meta">
                  <p className="news-source">Science Today</p>
                  <p className="news-date">1 day ago</p>
                </div>
              </div>
              <h3 className="news-title">
                AI Breakthrough in Medical Diagnostics
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
