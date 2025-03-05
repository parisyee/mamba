import { Link } from "react-router";

export default function TopNavbar() {
  return (
    <div className="grid grid-rows-1 grid-flow-col border-b border-gray-200 mb-4 md:mb-8">
      <div className="justify-self-start text-center px-4 py-4 sm:px-8 md:px-16">
        MAMBA
      </div>
      <div className="justify-self-end">
        <Link to="/login">
          <div className="w-full text-center px-4 py-4 sm:px-8 md:px-16">
            Login
          </div>
        </Link>
      </div>
    </div>
  );
}