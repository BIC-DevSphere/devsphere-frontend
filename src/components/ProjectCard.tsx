const ProjectCard = () => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute px-2 py-0.5 bg-green-500 rounded-full right-3 top-3 text-white font-body">Upcoming</div>
        <img
          className="h-72 rounded-lg"
          src="https://i.fokzine.net/upload/25/09/250914_1_daily1681_99.jpg"
          alt=""
        />
      </div>

      <p className="text-2xl font-heading font-medium">Airplane to Submarine</p>
      
      <div className="font-body">
        <p>Oct 11 - Oct 12</p>
        <p>Biratnagar International College</p>
      </div>
    </div>
  );
};

export default ProjectCard;
