import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import Register from "@/pages/auth/register";
import Login from "@/pages/auth/login";
import ConfirmEmail from "@/pages/auth/confirm-email";

import AppLayout from "@/layouts/app";
import AuthenticatedLayout from "@/layouts/authenticated";

import ProjectsIndex from "@/pages/projects";
import NewProject from "@/pages/projects/new";
import Project from "@/pages/projects/[id]";

const root = document.getElementById("app");

createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="confirm/:token" element={<ConfirmEmail />} />

        <Route element={<AuthenticatedLayout />}>
          {/* maybe there's a better root, but for now just render projects */}
          <Route index element={<ProjectsIndex />} />
        </Route>
      </Route>

      <Route path="projects" element={<AuthenticatedLayout />}>
        <Route element={<AppLayout />}>
          <Route index element={<ProjectsIndex />} />
          <Route path="new" element={<NewProject />} />
        </Route>
        <Route path=":id" element={<Project />} />
      </Route>
    </Routes>
  </BrowserRouter >
);
