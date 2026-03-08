import InfiniteGallery from '@/components/gallery/InfiniteGallery';
import MemberUserCard from '@/components/user/MemberUserCard';
import ProjectSection from '@/components/user/ProjectSection';
import UpcomingEventUserCard from '@/components/user/UpcomingEventUserCard';

const UserHome = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex w-full flex-col items-center justify-center bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[length:20px_20px] py-40 text-center">
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
      </div>
      <InfiniteGallery />
      <div className='px-20 space-y-20 py-20'>
      <UpcomingEventUserCard />
      <ProjectSection />
      <MemberUserCard />
      </div>
    </div>
  );
};

export default UserHome;
