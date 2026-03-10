import { useCallback } from 'react';
import InfiniteGallery from '@/components/gallery/InfiniteGallery';
import MemberUserCard from '@/components/user/MemberUserCard';
import ProjectSection from '@/components/user/ProjectSection';
import UpcomingEventUserCard from '@/components/user/UpcomingEventUserCard';
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

  const handleSectionChange = useCallback(
    (id: string, path: string) => {
      setActiveSection(id);
      window.history.replaceState(null, '', path ? `/${path}` : '/');
    },
    [setActiveSection]
  );

  useScrollSection(SECTIONS, handleSectionChange);

  return (
    <div>
      <section
        data-section-id="home"
        className="sticky top-0 z-0 flex h-screen w-full flex-col items-center justify-center gap-16 overflow-hidden bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[length:20px_20px] text-center"
      >
        <div className="relative">
          <img
            className="absolute -top-10 -left-20 w-24 md:-top-12 md:-left-36 md:w-40"
            src="/rocket.svg"
            alt="rocket"
          />
          <div className="mb-4 text-5xl font-bold md:text-7xl">
            <span className="text-red-500">Learn.</span>
            <span className="bg-red-700 px-4 text-white line-through">Code</span>
          </div>
          <div className="text-5xl font-bold md:text-7xl">
            <span className="text-black">Grow. </span>
            <span className="text-red-500">Together</span>
          </div>
          <img
            className="absolute -right-20 -bottom-10 w-24 md:-right-36 md:-bottom-12 md:w-40"
            src="/rocket.svg"
            alt="rocket"
          />
        </div>
        <div className="w-full">
          <InfiniteGallery />
        </div>
      </section>

      <div className="relative z-10 rounded-t-3xl bg-white">
        <div className="space-y-20 px-6 py-20 md:px-20">
          <section data-section-id="events">
            <UpcomingEventUserCard />
          </section>
          <section data-section-id="projects">
            <ProjectSection />
          </section>
          <section data-section-id="members">
            <MemberUserCard />
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
