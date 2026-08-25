import { FadeInSection } from "@/components/ui/FadeInSection";
import { blogPosts, BlogContent } from "@/lib/data/blog";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

function renderContent(block: BlogContent, i: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={i} className="text-slate-700 leading-relaxed mb-6 text-base md:text-lg">
          {block.text}
        </p>
      );
    case "heading2":
      return (
        <h2 key={i} className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-200">
          {block.text}
        </h2>
      );
    case "heading3":
      return (
        <h3 key={i} className="text-xl font-bold text-slate-900 mt-8 mb-3">
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <blockquote key={i} className="my-8 pl-5 border-l-4 border-slate-900">
          <p className="text-slate-700 italic text-lg leading-relaxed">"{block.text}"</p>
          {block.author && (
            <footer className="mt-2 text-sm text-slate-500">— {block.author}</footer>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul key={i} className="list-disc pl-6 mb-6 space-y-2">
          {block.items.map((item, j) => (
            <li key={j} className="text-slate-700 leading-relaxed text-base md:text-lg">
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre key={i} className="bg-slate-900 text-slate-100 rounded-xl p-5 overflow-x-auto mb-6 text-sm font-mono">
          <code>{block.text}</code>
        </pre>
      );
    case "divider":
      return <hr key={i} className="my-10 border-slate-200" />;
    default:
      return null;
  }
}

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-slate-50 border-b border-slate-200 pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8 gap-1"
          >
            ← Kembali ke Blog
          </Link>
          <div className="flex items-center gap-3 text-xs text-slate-500 uppercase tracking-wider mb-4">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readingTime} baca</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Article Body */}
      <FadeInSection>
        <article className="container mx-auto px-4 max-w-3xl py-16">
          {post.content.map((block, i) => renderContent(block, i))}

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between">
            <Link
              href="/blog"
              className="text-sm font-medium text-slate-900 hover:text-slate-600 transition-colors"
            >
              ← Semua Tulisan
            </Link>
            <span className="text-sm text-slate-400">Alif Ikhwan · {post.date}</span>
          </div>
        </article>
      </FadeInSection>
    </div>
  );
}
