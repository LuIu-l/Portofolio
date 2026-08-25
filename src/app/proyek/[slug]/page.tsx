import { getGithubProject } from "@/lib/github";
import { notFound } from "next/navigation";
import ProyekDetailClient from "./ProyekDetailClient";

export async function generateStaticParams() {
  return [
    { slug: 'Sppg-sistem' },
    { slug: 'Pantau-dana' },
    { slug: 'komunitasai' }
  ];
}

export default async function ProyekDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getGithubProject(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12 pt-32">
      <ProyekDetailClient project={project} />
    </div>
  );
}
