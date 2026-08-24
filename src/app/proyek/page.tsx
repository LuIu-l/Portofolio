import { getGithubProjects } from "@/lib/github";
import ProyekClient from "./ProyekClient";

export default async function ProyekPage() {
  const projects = await getGithubProjects();

  return (
    <div className="container mx-auto px-4 max-w-6xl py-12 pt-32">
      <ProyekClient projects={projects} />
    </div>
  );
}
