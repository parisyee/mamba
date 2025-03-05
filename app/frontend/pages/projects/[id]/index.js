import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProject } from "@/lib/api-clients/projects";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

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
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader project={project} />
          <div className="flex flex-1">
            <AppSidebar project={project} />
            <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="aspect-video rounded-xl bg-muted/50" />
                  <div className="aspect-video rounded-xl bg-muted/50" />
                  <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    ) : (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  )
}

// import ProjectDashboard from "@/components/project-dashboard";

// export default function Project() {
//   let { id } = useParams();
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     async function fetchProject() {
//       const response = await getProject(id);

//       if (!response.ok) {
//         alert(response.statusText);
//         return;
//       }

//       const { project } = await response.json();
//       setProject(project);
//     }

//     fetchProject();
//   }, [id]);

//   return (
//     project ? (
//       <ProjectDashboard project={project} />
//     ) : (
//       <div>
//         <h1>Loading...</h1>
//       </div>
//     )
//   );
// };
