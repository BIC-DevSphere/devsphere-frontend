import '@/App.css';
import InfiniteGallery from '@/components/gallery/InfiniteGallery';

const UserHome = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <div className="grid-bg relative flex w-full flex-col items-center justify-center py-20 text-center">
        <div className="relative">
          <img
            className="absolute -top-10 -left-20 w-24 md:-top-12 md:-left-36 md:w-40"
            src="rocket.svg"
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
            src="rocket.svg"
            alt="rocket"
          />
        </div>
      </div>
      <div className="w-full">
        <InfiniteGallery />
      </div>
    </div>
  );
};

export default UserHome;
