import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getProjects } from '@/lib/api-clients/projects';

export default function ProjectsIndex() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const response = await getProjects();
      const { projects } = await response.json();
      setProjects(projects);
    }

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <Link to="/projects/new">Create a Project</Link>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <Link to={`/projects/${project.id}`}>View Project</Link>
        </div>
      ))}
    </div>
  );
};