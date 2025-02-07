import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";

import Register from "@/pages/register";
import Login from "@/pages/login";

import AuthenticatedLayout from "@/layouts/authenticated";

import Dashboard from "@/pages/dashboard";

import Projects from "@/pages/projects";
import NewProject from "@/pages/projects/new";
import Project from "@/pages/projects/[id]";

const root = document.getElementById("app");

createRoot(root).render(
  <BrowserRouter>
    <Routes>

      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="confirm/:token" element={<Login />} />

      <Route element={<AuthenticatedLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="projects" element={<AuthenticatedLayout />}>
        <Route index element={<Projects />} />
        {/* <Route element={<ProjectsLayout />}> */}
        <Route path="new" element={<NewProject />} />
        <Route path=":id" element={<Project />} />
        {/* </Route> */}
      </Route>
    </Routes>
  </BrowserRouter >
);
