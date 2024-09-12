"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const ProjectDataContext = createContext<Project | null>(null);

export function ProjectDataProvider({
  projectName,
  children,
}: {
  projectName: string;
  children: ReactNode;
}) {
  const { data: session } = useSession();
  const [projectDetails, setProjectDetails] = useState(null);

  const fetchProjectDetails = async () => {
    try {
      const res = await fetch(
        `/api/project-details?project-name=${projectName}&curr-uid=${session?.user?.id}`
      );
      const data = await res.json();
      setProjectDetails(data);
    } catch (err) {
      console.error(err);
      setProjectDetails(null);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  if (!session?.user?.id) return null;

  return (
    <ProjectDataContext.Provider value={projectDetails}>
      {children}
    </ProjectDataContext.Provider>
  );
}
