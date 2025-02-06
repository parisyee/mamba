import { useParams } from "react-router";

export default function Project() {
  let { id } = useParams();

  return (
    <div>
      <h1>{`Project ${id}`}</h1>
    </div>
  );
};