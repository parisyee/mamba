import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import Register from "@/pages/auth/register";
import Login from "@/pages/auth/login";
import ConfirmEmail from "@/pages/auth/confirm-email";

import AuthenticatedLayout from "@/layouts/authenticated";

import ProjectsIndex from "@/pages/projects";
import NewProject from "@/pages/projects/new";
import Project from "@/pages/projects/[id]";

const root = document.getElementById("app");

createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="confirm/:token" element={<ConfirmEmail />} />

      <Route element={<AuthenticatedLayout />}>
        {/* maybe there's a better root, but for now just render projects */}
        <Route index element={<ProjectsIndex />} />
      </Route>

      <Route path="projects" element={<AuthenticatedLayout />}>
        <Route index element={<ProjectsIndex />} />
        {/* <Route element={<ProjectsLayout />}> */}
        <Route path="new" element={<NewProject />} />
        <Route path=":id" element={<Project />} />
        {/* </Route> */}
      </Route>
    </Routes>
  </BrowserRouter >
);
