import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/services/admin/api";
import { useEffect, useState } from "react";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="grid py-12 px-8 gap-4">
      <p className="text-4xl font-semibold">Projects</p>

      <Button className="justify-self-end">Add New Project</Button>

      <div className="">Search and Filter</div>

      <div className="flex flex-wrap gap-x-4 gap-y-12">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default AdminProjects;
