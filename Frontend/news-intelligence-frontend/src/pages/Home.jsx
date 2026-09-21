import Hero from '../components/Hero';
import IntelligencePreview from '../components/IntelligencePreview';
import HowItWorks from '../components/HowItWorks';
import CoreCapabilities from '../components/CoreCapabilities';
import FinalCTA from '../components/FinalCTA';
import SectionNavigator from '../components/SectionNavigator';

const Home = () => {
  const sections = [
    { id: 'hero', label: 'OVERVIEW' },
    { id: 'intelligence-preview', label: 'AI PREVIEW' },
    { id: 'how-it-works', label: 'PIPELINE' },
    { id: 'core-capabilities', label: 'CAPABILITIES' },
    { id: 'final-cta', label: 'LAUNCH API' },
  ];

  return (
    <div className="home-page">
      <SectionNavigator sections={sections} />
      <Hero />
      <IntelligencePreview />
      <HowItWorks />
      <CoreCapabilities />
      <FinalCTA />
    </div>
  );
};

export default Home;
