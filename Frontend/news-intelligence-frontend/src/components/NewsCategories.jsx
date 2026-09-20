import { useRef, useEffect } from 'react';
import { Laptop, Briefcase, Microscope, Trophy, Globe, Heart as HeartIcon, Sprout, Landmark } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './NewsCategories.css';

gsap.registerPlugin(ScrollTrigger);

const NewsCategories = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const categories = [
    { name: 'Technology', icon: Laptop, color: '#6366F1' },
    { name: 'Business', icon: Briefcase, color: '#8B5CF6' },
    { name: 'Science', icon: Microscope, color: '#10b981' },
    { name: 'Sports', icon: Trophy, color: '#f59e0b' },
    { name: 'World', icon: Globe, color: '#3b82f6' },
    { name: 'Health', icon: HeartIcon, color: '#ec4899' },
    { name: 'Environment', icon: Sprout, color: '#14b8a6' },
    { name: 'Politics', icon: Landmark, color: '#ef4444' }
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
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.4)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="news-categories" ref={sectionRef}>
      <div className="news-categories-container">
        <div className="section-header" ref={headerRef}>
          <span className="section-label">Coverage</span>
          <h2 className="section-title">Analyze News Across All Categories</h2>
          <p className="section-description">
            Unified intelligence pipeline works across all news domains
          </p>
        </div>

        <div className="categories-grid" ref={gridRef}>
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="category-card" style={{ '--category-color': category.color }}>
                <div className="category-icon">
                  <Icon size={28} />
                </div>
                <span className="category-name">{category.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsCategories;
