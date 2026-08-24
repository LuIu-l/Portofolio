"use client";

import { FadeInSection } from "@/components/ui/FadeInSection";
import { GithubProject } from "@/lib/github";
import { GlowingCard } from "@/components/ui/GlowingCard";

export default function ProyekDetailClient({ project }: { project: GithubProject }) {
  const formattedDate = new Date(project.updated_at).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <FadeInSection>
      <div className="mb-8">
        <a href="/proyek" className="text-slate-500 hover:text-slate-900 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded-sm mb-4 inline-block">
          &larr; Kembali ke Proyek
        </a>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{project.name}</h1>
        <div className="flex flex-wrap gap-3 mb-6">
          {project.language && (
            <span className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-full">
              {project.language}
            </span>
          )}
          {project.fork && (
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full flex items-center gap-1 uppercase tracking-wider">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v12"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
              Fork
            </span>
          )}
          <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            {project.stargazers_count} Stars
          </span>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
            Diperbarui: {formattedDate}
          </span>
        </div>
        
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.topics.map((topic) => (
              <span key={topic} className="px-2 py-1 border border-slate-200 text-slate-500 text-xs rounded-md uppercase tracking-wider">
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>

      <GlowingCard className="p-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Deskripsi</h2>
        <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-wrap">{project.description}</p>
        
        <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-slate-100">
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Lihat Repository GitHub
          </a>
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-slate-900 border border-slate-200 text-sm font-medium rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Live Demo
            </a>
          )}
        </div>
      </GlowingCard>
    </FadeInSection>
  );
}
