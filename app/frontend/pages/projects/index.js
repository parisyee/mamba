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
      <div className="flex justify-between mb-4">
        <h1 className="font-mono font-bold text-3xl">Projects</h1>
        <Link to="/projects/new">
          <div className="border-solid border-2 rounded-sm p-2">
            Create a Project
          </div>
        </Link>
      </div>
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  );
};

const Project = ({ project }) => {
  return (
    <div>
      <Link to={`/projects/${project.id}`}>
        <h2 className="font-mono text-2xl">{project.name}</h2>
      </Link>
      <p>Created: {formatDate(project.created_at)}</p>
    </div>
  );
}

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
}