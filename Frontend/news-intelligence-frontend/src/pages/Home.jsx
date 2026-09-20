import Hero from '../components/Hero';
import IntelligencePreview from '../components/IntelligencePreview';
import HowItWorks from '../components/HowItWorks';
import CoreCapabilities from '../components/CoreCapabilities';
import FinalCTA from '../components/FinalCTA';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <IntelligencePreview />
      <HowItWorks />
      <CoreCapabilities />
      <FinalCTA />
    </div>
  );
};

export default Home;
