import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "./ui/button";

const UpcomingEventUserCard = () => {
  return (
    <div className="w-full h-88 bg-white rounded-2xl shadow-xl overflow-hidden flex hover:shadow-2xl transition-all duration-300">
      {/* Left Image Section */}
      <div className="relative w-1/3 h-full p-4">
        <img
          src="https://placehold.co/600x400/000000/FFF"
          alt="Upcoming Event Image"
          className="h-full w-full object-cover rounded-2xl"
        />

        {/* Upcoming Tag */}
        <span className="absolute top-6 right-6 bg-white text-xs font-semibold px-3 py-1 rounded shadow-md">
          Upcoming
        </span>
      </div>

      {/* Right Content Section */}
      <div className="w-2/3 flex flex-col justify-between p-8 pr-10">
        <div>
          {/* Title and Description */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-1">
            AI and Machine Learning
          </h1>
          <p className="text-gray-400 text-base leading-relaxed mb-4 max-w-4xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit totam,
            iusto voluptas doloribus facilis explicabo beatae nulla maiores.
            Blanditiis, mollitia.
          </p>

          {/* Vertical Details */}
          <div className="flex flex-col gap-3 text-base">
            <div className="flex items-center gap-1">
              <Calendar className="w-5 h-5 text-red-600" />
              <span className="text-gray-600 text-sm">Dec 15 - Dec 20, 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="text-gray-600 text-sm">BIC, Biratnagar</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-5 h-5 text-red-600" />
              <span className="text-gray-600 text-sm">150+ registered</span>
            </div>
            <div>
              <span className="inline-flex items-center bg-blue-100 text-gray-600 text-xs font-medium px-3 py-1 rounded">
                <span className="text-blue-600 mr-1">•</span>3-day event
              </span>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="pt-3">
          <Button className="bg-blue-800 hover:bg-blue-900 text-white w-1/3 h-auto px-10 py-4 text-base font-semibold rounded-lg transition-all duration-200">
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventUserCard;
