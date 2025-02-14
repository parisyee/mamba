import { useNavigate } from "react-router";
import { createProject } from "@/utils/api-clients/projects";

export default function NewProject() {
  const navigate = useNavigate();

  async function submitNewProject(formData) {
    const projectData = {
      name: formData.get("name")
    };

    const response = await createProject(projectData);

    if (response.ok) {
      const { project } = await response.json();
      navigate(`/projects/${project.id}`);
    } else {
      alert(response.statusText);
    }
  };

  return (
    <div>
      <h1>New Project</h1>
      <form action={submitNewProject}>
        <div>
          <label>Name</label>
          <input type="text" name="name" />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};