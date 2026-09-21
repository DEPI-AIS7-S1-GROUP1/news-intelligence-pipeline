import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const tagRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctasRef = useRef(null);
  const scrollPromptRef = useRef(null);
  const techBadgeRef = useRef(null);

  // Canvas ambient particles logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool setup
    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      isRed: Math.random() < 0.12, // Small red accents
    }));

    // Mouse tracking for subtle parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particles & light connecting lines
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse drift
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.x -= (dx / dist) * 0.2;
          p.y -= (dy / dist) * 0.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.isRed) {
          ctx.fillStyle = `rgba(229, 57, 53, ${p.alpha + 0.2})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        }
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distance < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 * (1 - distance / 110)})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP entrance animation sequence
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(tagRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.8,
        delay: 0.2,
      })
      .from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.1,
      }, '-=0.4')
      .from(subheadlineRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.9,
      }, '-=0.6')
      .from(ctasRef.current ? ctasRef.current.children : [], {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
      }, '-=0.5')
      .from(techBadgeRef.current, {
        opacity: 0,
        scale: 0.94,
        duration: 0.8,
      }, '-=0.4')
      .from(scrollPromptRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.6,
      }, '-=0.2');
    },
    { scope: heroRef }
  );

  return (
    <section className="hero-scene" id="hero" ref={heroRef}>
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Background radial glow */}
      <div className="atmospheric-glow" />

      {/* Geometric accent details */}
      <div className="geo-fragment fragment-1" />
      <div className="geo-fragment fragment-2" />
      <div className="geo-fragment fragment-3" />

      <div className="hero-content-container">
        {/* Classification Tag */}
        <div className="hero-tag" ref={tagRef}>
          <span className="red-dot-accent" />
          <span className="tag-mono">POST /api/news/analyze</span>
          <span className="tag-divider">·</span>
          <span className="tag-status">FASTAPI ENGINE</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-title" ref={headlineRef}>
          Understand articles.<br />
          <span className="title-highlight">Classify them instantly.</span>
        </h1>

        {/* Subheadline */}
        <p className="hero-description" ref={subheadlineRef}>
          An AI-powered article classification API built with FastAPI. Transform raw text and news content into structured categorizations, entity maps, and sentiment intelligence.
        </p>

        {/* Action Buttons */}
        <div className="hero-ctas" ref={ctasRef}>
          <Link to="/analyze" className="btn-primary">
            <span>TRY CLASSIFIER</span>
            <span className="btn-arrow">→</span>
          </Link>
          <a href="#intelligence-preview" className="btn-secondary">
            <span>EXPLORE DEMO</span>
          </a>
        </div>

        {/* Floating Technical Badge / Classification Flow Detail */}
        <div className="hero-tech-badge" ref={techBadgeRef}>
          <div className="tech-badge-flow">
            <span className="flow-step">ARTICLE</span>
            <span className="flow-arrow">↓</span>
            <span className="flow-step">PROCESSING</span>
            <span className="flow-arrow">↓</span>
            <span className="flow-step active-step">CLASSIFICATION</span>
            <span className="flow-arrow">↓</span>
            <span className="flow-result">TECHNOLOGY · 94.8%</span>
          </div>
        </div>
      </div>

      {/* Scroll Prompt */}
      <div className="scroll-prompt" ref={scrollPromptRef}>
        <span className="scroll-text">SCROLL TO EXPLORE</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
