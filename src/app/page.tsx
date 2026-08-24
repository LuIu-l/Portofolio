import { getGithubProjects } from "@/lib/github";
import HomePageClient from "./HomePageClient";

export default async function Home() {
  const projects = await getGithubProjects();

  return <HomePageClient projects={projects} />;
}
