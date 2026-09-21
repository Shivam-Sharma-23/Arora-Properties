import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/home/Hero';
import SearchCard from '../components/home/SearchCard';
import FeaturedProperties from '../components/home/FeaturedProperties';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HowItWorks from '../components/home/HowItWorks';
import PopularLocations from '../components/home/PopularLocations';
import AgentsSection from '../components/home/AgentsSection';
import Testimonials from '../components/home/Testimonials';
import PropertyGuideSection from '../components/home/PropertyGuideSection';
import FaqAccordion from '../components/home/FaqAccordion';
import BlogSection from '../components/home/BlogSection';
import FinalCtaNewsletter from '../components/home/FinalCtaNewsletter';
import { scrollToSectionId } from '../utils/scrollToHash';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      scrollToSectionId(location.hash.slice(1));
    }
  }, [location.hash]);

  return (
    <div>
      <Hero />
      <SearchCard />
      <FeaturedProperties />
      <WhyChooseUs />
      <HowItWorks />
      <PopularLocations />
      <AgentsSection />
      <Testimonials />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 100px' }}>
        <PropertyGuideSection />
        <FaqAccordion />
        <BlogSection />
      </div>
      <FinalCtaNewsletter />
    </div>
  );
}
