import { useParams } from "react-router";

const Project = () => {
  let { id } = useParams();

  return (
    <div>
      <h1>{`Project ${id}`}</h1>
    </div>
  );
};

export default Project;