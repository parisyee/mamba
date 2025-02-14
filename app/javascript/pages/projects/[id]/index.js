import { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProject } from "@/utils/api-clients/projects";
import ProjectDashboard from "@/components/project-dashboard";

export default function Project() {
  let { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      const response = await getProject(id);

      if (!response.ok) {
        alert(response.statusText);
        return;
      }

      const { project } = await response.json();
      setProject(project);
    }

    fetchProject();
  }, [id]);

  return (
    project ? (
      <ProjectDashboard project={project} />
    ) : (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  );
};