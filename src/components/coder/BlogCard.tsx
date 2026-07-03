"use client";

import Link from "next/link";
import { blogTracks, type BlogPost } from "@/data/blog";

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const KIND_LABEL: Record<BlogPost["kind"], string> = { link: "External", md: "Article", html: "Article" };

/** Compact, reader-friendly blog card shared by the preview and the full index. */
export function BlogCard({ post, accent }: { post: BlogPost; accent: string }) {
  const track = blogTracks.find((t) => t.id === post.track);
  const trackColor = track?.color ?? accent;
  const isExternal = post.kind === "link";

  const inner = (
    <article className="glass glass-hover flex h-full flex-col rounded-xl p-4">
      <div className="flex items-center gap-2 text-[10px]">
        <span
          className="rounded-full px-2 py-0.5 font-semibold"
          style={{ background: `${trackColor}1f`, color: trackColor }}
        >
          {track?.label ?? post.track}
        </span>
        <span className="font-mono uppercase tracking-wider text-white/30">{KIND_LABEL[post.kind]}</span>
        {post.featured && (
          <span className="font-mono uppercase tracking-wider" style={{ color: accent }}>
            ★
          </span>
        )}
        {isExternal && <span className="ml-auto text-white/30">↗</span>}
      </div>

      <h3 className="mt-2 font-display text-[15px] font-semibold leading-snug text-white group-hover:underline">
        {post.title}
      </h3>
      <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-white/55 line-clamp-2">{post.summary}</p>

      <div className="mt-3 flex flex-wrap gap-1">
        {post.tags.slice(0, 3).map((t) => (
          <span key={t} className="chip !px-2 !py-0.5 !text-[10px]">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-white/40">
        <span>{fmtDate(post.date)}</span>
        {post.readingMinutes && <span>· {post.readingMinutes}m</span>}
        <span className="ml-auto font-medium" style={{ color: accent }}>
          {isExternal ? "Source →" : "Read →"}
        </span>
      </div>
    </article>
  );

  return isExternal ? (
    <a href={(post as any).href} target="_blank" rel="noreferrer" className="group block h-full">
      {inner}
    </a>
  ) : (
    <Link href={`/coder/blog/${post.slug}`} className="group block h-full">
      {inner}
    </Link>
  );
}
