"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { BlogCard } from "@/components/coder/BlogCard";
import { allPostsSorted } from "@/data/blog";

/** On-page preview: featured-first, top 4 posts, then a link to the full index. */
export function EngineeringBlog({ accent }: { accent: string }) {
  const top = useMemo(() => {
    const all = allPostsSorted();
    // featured first, then most recent — capped at 4
    return [...all].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false)).slice(0, 4);
  }, []);

  const total = allPostsSorted().length;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {top.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 4) * 0.05}>
            <BlogCard post={post} accent={accent} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-6 flex justify-center">
          <Link
            href="/coder/blog"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300"
            style={{ borderColor: `${accent}55`, color: accent }}
          >
            View all {total} posts · search & filter →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
