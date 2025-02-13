import { Link } from 'react-router';

export default function ProjectsIndex() {
  return (
    <div>
      <h1>Projects</h1>
      <Link to="/projects/new">Create a Project</Link>
    </div>
  );
};