import { useRef, useEffect } from 'react';
import { FileText, Tag, Building2, Heart, Brain, Lightbulb } from 'lucide-react';
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
      icon: FileText,
      title: 'Summarization',
      description: 'Generate concise summaries that capture essential information and main arguments without losing critical details.'
    },
    {
      icon: Tag,
      title: 'Classification',
      description: 'Automatically categorize articles by topic, industry, and content type using multi-label classification models.'
    },
    {
      icon: Building2,
      title: 'Entity Extraction',
      description: 'Identify and extract people, organizations, locations, dates, and other named entities from unstructured text.'
    },
    {
      icon: Heart,
      title: 'Sentiment Analysis',
      description: 'Measure emotional tone, detect bias, and assess positivity or negativity across content and entities.'
    },
    {
      icon: Brain,
      title: 'Contextual Understanding',
      description: 'Understand relationships between entities, detect implications, and surface underlying themes and narratives.'
    },
    {
      icon: Lightbulb,
      title: 'Actionable Insights',
      description: 'Generate intelligence reports with key findings, impact assessment, and decision-relevant recommendations.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state to visible
      gsap.set([headerRef.current.children, cardsRef.current.children], {
        opacity: 1,
        y: 0
      });

      gsap.from(headerRef.current.children, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      gsap.from(cardsRef.current.children, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
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
    <section className="core-capabilities" id="features" ref={sectionRef}>
      <div className="core-capabilities-container">
        <div className="section-header" ref={headerRef}>
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">What News Intelligence Can Do</h2>
          <p className="section-description">
            Comprehensive analysis powered by state-of-the-art NLP and machine learning
          </p>
        </div>

        <div className="capabilities-grid" ref={cardsRef}>
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div key={index} className="capability-card">
                <div className="capability-icon-wrapper">
                  <Icon size={24} />
                </div>
                <h3 className="capability-title">{capability.title}</h3>
                <p className="capability-description">{capability.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities;
