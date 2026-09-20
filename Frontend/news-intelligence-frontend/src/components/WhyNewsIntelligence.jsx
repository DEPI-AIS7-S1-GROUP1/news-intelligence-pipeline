import { useRef, useEffect } from 'react';
import { Zap, Target, Database, Search, Globe, Puzzle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyNewsIntelligence.css';

gsap.registerPlugin(ScrollTrigger);

const WhyNewsIntelligence = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const benefits = [
    {
      icon: Zap,
      title: 'Speed & Efficiency',
      description: 'Analyze articles in seconds instead of spending minutes reading and manually extracting information.'
    },
    {
      icon: Target,
      title: 'Accuracy & Consistency',
      description: 'AI models provide reliable entity extraction, sentiment scoring, and categorization without human error or bias.'
    },
    {
      icon: Database,
      title: 'Structured Data',
      description: 'Transform unstructured text into machine-readable JSON, ready for databases, dashboards, or further analysis.'
    },
    {
      icon: Search,
      title: 'Deep Understanding',
      description: 'Go beyond surface-level reading with sentiment analysis, entity relationships, and contextual insights.'
    },
    {
      icon: Globe,
      title: 'Scalable Processing',
      description: 'Analyze hundreds of articles with the same effort as one, enabling comprehensive news monitoring.'
    },
    {
      icon: Puzzle,
      title: 'Integration Ready',
      description: 'RESTful API designed to integrate with existing workflows, applications, and data pipelines.'
    }
  ];

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

      gsap.from(gridRef.current.children, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="why-news-intelligence" id="about" ref={sectionRef}>
      <div className="why-container">
        <div className="section-header" ref={headerRef}>
          <span className="section-label">Benefits</span>
          <h2 className="section-title">Why News Intelligence?</h2>
          <p className="section-description">
            Built for professionals who need actionable insights from news content
          </p>
        </div>

        <div className="benefits-grid" ref={gridRef}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="benefit-card">
                <div className="benefit-icon-wrapper">
                  <Icon size={32} />
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyNewsIntelligence;
