import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchMode } from './useSearchMode';
import { useToast } from './useToast';

export function useSectionNav() {
  const navigate = useNavigate();
  const { setBuyRent } = useSearchMode();
  const { showToast } = useToast();

  const goHome = useCallback(() => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [navigate]);

  const goProperties = useCallback(() => {
    navigate('/properties');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [navigate]);

  const goFavorites = useCallback(() => {
    navigate('/favorites');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [navigate]);

  const goBuy = useCallback(() => {
    setBuyRent('buy');
    goProperties();
  }, [setBuyRent, goProperties]);

  const goRent = useCallback(() => {
    setBuyRent('rent');
    goProperties();
  }, [setBuyRent, goProperties]);

  const goSell = useCallback(() => {
    showToast('Listing your property — our team will reach out shortly.');
  }, [showToast]);

  const goSection = useCallback((id) => {
    navigate('/#' + id);
  }, [navigate]);

  const goAbout = useCallback(() => goSection('why-choose-us'), [goSection]);
  const goAgents = useCallback(() => goSection('agents-section'), [goSection]);
  const goOurOffice = useCallback(() => goSection('our-office'), [goSection]);
  const goPropertyGuide = useCallback(() => goSection('property-guide'), [goSection]);
  const goFaqs = useCallback(() => goSection('faqs'), [goSection]);
  const goBlog = useCallback(() => goSection('blog'), [goSection]);

  const preventDefault = useCallback((e) => e.preventDefault(), []);

  return {
    goHome, goProperties, goFavorites, goBuy, goRent, goSell,
    goAbout, goAgents, goOurOffice, goPropertyGuide, goFaqs, goBlog,
    preventDefault,
  };
}
