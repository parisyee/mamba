import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/projects";
import NewProject from "./pages/projects/new";
import Project from "./pages/projects/[id]";

const root = document.getElementById("app");

createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Dashboard />} />

      <Route path="projects">
        <Route index element={<Projects />} />
        {/* <Route element={<ProjectsLayout />}> */}
        <Route path="new" element={<NewProject />} />
        <Route path=":id" element={<Project />} />
        {/* </Route> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
