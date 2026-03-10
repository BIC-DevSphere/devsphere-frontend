import { useEffect, useRef } from 'react';

type SectionConfig = { id: string; path: string };

export function scrollToSection(id: string) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.querySelector(`[data-section-id="${id}"]`);
  if (!el) return;
  const navbarHeight = (document.querySelector('nav') as HTMLElement)?.offsetHeight ?? 0;
  const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function useScrollSection(
  sections: SectionConfig[],
  onSectionChange: (id: string, path: string) => void
) {
  const handlerRef = useRef(onSectionChange);
  const activeSectionRef = useRef('');

  useEffect(() => {
    handlerRef.current = onSectionChange;
  });

  useEffect(() => {
    const getActiveSection = (): SectionConfig => {
      const threshold = window.innerHeight * 0.4;
      let active = sections[0];

      for (const section of sections) {
        if (section.id === 'home') continue;
        const el = document.querySelector(`[data-section-id="${section.id}"]`);
        if (el && el.getBoundingClientRect().top <= threshold) {
          active = section;
        }
      }

      return active;
    };

    const handleScroll = () => {
      const active = getActiveSection();
      if (active.id !== activeSectionRef.current) {
        activeSectionRef.current = active.id;
        handlerRef.current(active.id, active.path);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
}
