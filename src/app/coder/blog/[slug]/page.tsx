import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PersonaTheme } from "@/components/themes/PersonaTheme";
import { ArticleBody } from "@/components/coder/ArticleBody";
import { personaBySlug } from "@/data/profile";
import { blogPosts, postBySlug, trackById, type BlogPost } from "@/data/blog";

// Resolve an article body: prefer an inline `body`, else load the file at
// src/content/blog/<slug>.(md|html). Runs at build time (static generation).
function resolveBody(post: Extract<BlogPost, { kind: "md" | "html" }>): string {
  if (post.body) return post.body;
  const ext = post.kind === "md" ? "md" : "html";
  const file = path.join(process.cwd(), "src", "content", "blog", `${post.slug}.${ext}`);
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

const persona = personaBySlug("coder")!;

// Pre-render every md/html article. (Link posts live off-site, so they're skipped.)
export function generateStaticParams() {
  return blogPosts.filter((p) => p.kind !== "link").map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = postBySlug(params.slug);
  if (!post) return { title: "Article not found" };
  return { title: `${post.title} · Developer`, description: post.summary };
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = postBySlug(params.slug);
  if (!post || post.kind === "link") notFound();

  const track = trackById(post.track);
  const trackColor = track?.color ?? persona.accent;

  return (
    <>
      <PersonaTheme slug="coder" />

      <article className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32 sm:px-8">
        <Link
          href="/coder#engineering-blog"
          className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
        >
          ← Engineering Blog
        </Link>

        <header className="mt-8 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span
              className="rounded-full px-2.5 py-0.5 font-semibold"
              style={{ background: `${trackColor}1f`, color: trackColor }}
            >
              {track?.label ?? post.track}
            </span>
            <span className="text-white/40">{fmtDate(post.date)}</span>
            {post.readingMinutes && <span className="text-white/40">· {post.readingMinutes} min read</span>}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-white/60">{post.summary}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span key={t} className="chip !px-2.5 !py-0.5 !text-[11px]">
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-10">
          <ArticleBody kind={post.kind} body={resolveBody(post)} />
        </div>
      </article>
    </>
  );
}
