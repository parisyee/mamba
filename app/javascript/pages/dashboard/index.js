import { Link } from "react-router";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/projects">Projects</Link>
    </div>
  );
};

export default Dashboard;