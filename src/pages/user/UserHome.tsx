import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import InfiniteGallery from '@/components/gallery/InfiniteGallery';
import MemberUserCard from '@/components/user/MemberUserCard';
import ProjectSection from '@/components/user/ProjectSection';
import UpcomingEventUserCard from '@/components/user/UpcomingEventUserCard';
import FAQ from '@/components/user/FAQ';
import { useScrollSection } from '@/hooks/useScrollSection';
import { useScrollSectionContext } from '@/contexts/ScrollSectionContext';

const SECTIONS = [
  { id: 'home', path: '' },
  { id: 'events', path: 'events' },
  { id: 'projects', path: 'projects' },
  { id: 'members', path: 'members' },
];

const UserHome = () => {
  const { setActiveSection } = useScrollSectionContext();
  const [heroProgress, setHeroProgress] = useState(0);

  const handleSectionChange = useCallback(
    (id: string, path: string) => {
      setActiveSection(id);
      window.history.replaceState(null, '', path ? `/${path}` : '/');
    },
    [setActiveSection]
  );

  useScrollSection(SECTIONS, handleSectionChange);

  useEffect(() => {
    const updateHeroProgress = () => {
      const viewportHeight = window.innerHeight || 1;
      const nextProgress = Math.min(window.scrollY / (viewportHeight * 0.9), 1);
      setHeroProgress(nextProgress);
    };

    updateHeroProgress();
    window.addEventListener('scroll', updateHeroProgress, { passive: true });
    window.addEventListener('resize', updateHeroProgress);

    return () => {
      window.removeEventListener('scroll', updateHeroProgress);
      window.removeEventListener('resize', updateHeroProgress);
    };
  }, []);

  const heroStyle = { '--hero-progress': heroProgress } as CSSProperties;

  return (
    <div>
      <section
        data-section-id="home"
        style={heroStyle}
        className="sticky top-0 z-0 flex h-screen w-full flex-col items-center justify-center gap-16 overflow-hidden bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[length:20px_20px] text-center [--hero-progress:0]"
      >
        <div className="hero-motion-content">
          <img
            className="hero-motion-rocket-left absolute -top-10 -left-20 w-24 md:-top-12 md:-left-36 md:w-40"
            src="/rocket.svg"
            alt="rocket"
          />
          <div className="mb-4 text-5xl font-bold md:text-7xl">
            <span className="text-red-700">Learn.</span>
            <span className="bg-red-700 px-4 text-white line-through">Code</span>
          </div>
          <div className="text-5xl font-bold md:text-7xl">
            <span className="text-black">Grow. </span>
            <span className="text-red-700">Together</span>
          </div>
          <img
            className="hero-motion-rocket-right absolute -right-20 -bottom-10 w-24 md:-right-36 md:-bottom-12 md:w-40"
            src="/rocket.svg"
            alt="rocket"
          />
        </div>
        <div className="hero-motion-gallery w-full">
          <InfiniteGallery />
        </div>
      </section>

      <div style={heroStyle} className="hero-motion-panel relative z-10 rounded-t-3xl bg-white">
        <div className="space-y-20 px-6 py-20 md:px-40">
          <section data-section-id="events">
            <UpcomingEventUserCard />
          </section>
          <section data-section-id="projects">
            <ProjectSection />
          </section>
          <section data-section-id="members">
            <MemberUserCard />
          </section>
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
