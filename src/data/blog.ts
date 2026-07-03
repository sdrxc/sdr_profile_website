// Engineering Blog — data model for the Coder persona.
//
// Each post belongs to a `track` (GenAI, Classical ML, …) and is one of three
// kinds:
//   • "link" — an external article (Medium, dev.to, company blog). Opens out.
//   • "md"   — a Markdown article authored in `body`. Rendered at /coder/blog/[slug].
//   • "html" — a raw HTML article in `body`. Rendered (sanitised-by-trust) at the same route.
//
// To publish: add an entry below. For md/html, write the article into `body`
// (or paste a long string). `slug` must be unique and URL-safe.

export type BlogTrack = {
  id: string;
  label: string;
  blurb: string;
  color: string;
};

export type BlogPostBase = {
  slug: string;
  title: string;
  track: string; // BlogTrack.id
  date: string; // ISO yyyy-mm-dd
  summary: string;
  tags: string[];
  readingMinutes?: number;
  featured?: boolean;
};

export type LinkPost = BlogPostBase & { kind: "link"; href: string; source?: string };
// `body` is optional for md/html: if omitted, the article reader loads the
// content from `src/content/blog/<slug>.md` (or `.html`) at build time. Use a
// file for long-form articles, or inline `body` for short ones.
export type MarkdownPost = BlogPostBase & { kind: "md"; body?: string };
export type HtmlPost = BlogPostBase & { kind: "html"; body?: string };

export type BlogPost = LinkPost | MarkdownPost | HtmlPost;

export const blogTracks: BlogTrack[] = [
  { id: "genai", label: "GenAI", blurb: "LLMs, agents, RAG & the systems around them", color: "#ec4899" },
  { id: "classical-ml", label: "Classical ML", blurb: "Models, features, evaluation & the fundamentals", color: "#22d3ee" },
  { id: "systems", label: "Systems & Infra", blurb: "Distributed systems, data pipelines & cloud", color: "#a3e635" },
  { id: "engineering", label: "Engineering Notes", blurb: "Craft, tooling & lessons from shipping", color: "#f59e0b" },
];

export const blogPosts: BlogPost[] = [
  {
    // First article — body lives in src/content/blog/genai-roadmap-encoders-to-rag.md
    kind: "md",
    slug: "genai-roadmap-encoders-to-rag",
    title: "A Beginner's Guide & Roadmap to GenAI: From Encoders & Decoders to RAG and Agents",
    track: "genai",
    date: "2026-06-18",
    summary:
      "A six-week, build-as-you-go roadmap from transformer architecture through vector databases, RAG, fine-tuning, deployment and evaluation — ending at the leap into autonomous agents. Curated sources for RAG and agentic systems at the end.",
    tags: ["Roadmap", "Beginner", "Transformers", "RAG", "Agents", "LLM"],
    readingMinutes: 15,
    featured: true,
  },
  {
    kind: "md",
    slug: "agentic-rag-routing",
    title: "Deterministic vs. Agentic Routing in Production RAG",
    track: "genai",
    date: "2026-05-28",
    summary:
      "Why most RAG systems shouldn't be fully agentic — a hybrid router that keeps the predictable path deterministic and escalates only when it must.",
    tags: ["RAG", "Agents", "LangGraph", "Latency"],
    readingMinutes: 9,
    body: `# Deterministic vs. Agentic Routing in Production RAG

Most "agentic RAG" demos route *everything* through an LLM planner. In production
that's slow, expensive, and hard to debug. The pattern that actually held up for
us: **deterministic-first, agentic-on-escalation**.

## The core idea

> Treat the LLM planner as an exception handler, not the main loop.

1. **Classify cheaply.** A small intent classifier decides if the query maps to a
   known, well-served path.
2. **Serve the happy path deterministically.** Templated retrieval + a single
   generation call. Cache aggressively.
3. **Escalate only the long tail.** Ambiguous or multi-hop queries fall through to
   a multi-agent planner.

## Why it works

- **Latency** collapses for the 80% of traffic that is routine.
- **Observability** improves — deterministic paths are trivially traceable.
- **Cost** drops because the planner runs on a fraction of requests.

\`\`\`python
def route(query: str) -> Path:
    intent = classifier(query)
    if intent.confidence > 0.8 and intent.label in KNOWN_PATHS:
        return DeterministicPath(intent.label)
    return AgenticPath()  # the expensive, flexible fallback
\`\`\`

## What I'd watch

- Keep the classifier's confidence threshold **tunable** — it's your latency/quality dial.
- Log every escalation. The long tail is where your next deterministic path is hiding.

*More to come on guardrails and eval harnesses.*`,
  },
  {
    kind: "link",
    slug: "graphrag-knowledge-curation",
    title: "Knowledge-Graph Curation for Graph RAG",
    track: "genai",
    date: "2026-04-12",
    summary:
      "Turning messy multimodal data into a curated knowledge graph that a Graph RAG system can actually reason over.",
    tags: ["GraphRAG", "Knowledge Graph", "Neo4j"],
    readingMinutes: 7,
    href: "https://github.com/sdrxc",
    source: "External",
  },
  {
    kind: "md",
    slug: "evaluation-beyond-accuracy",
    title: "Evaluation Beyond Accuracy",
    track: "classical-ml",
    date: "2026-03-02",
    summary:
      "Accuracy hides more than it reveals. A short tour of calibration, slice-based metrics, and why your test set is lying to you.",
    tags: ["Evaluation", "Calibration", "MLOps"],
    readingMinutes: 6,
    body: `# Evaluation Beyond Accuracy

A single accuracy number is a **summary statistic of a summary statistic**. Here's
what I reach for before trusting a model.

## 1. Slice-based metrics
Aggregate accuracy can be 92% while a critical sub-population sits at 60%. Always
report metrics **per slice** (segment, geography, class).

## 2. Calibration
A model that says "0.9" should be right ~90% of the time. Plot a reliability
diagram; if it's off, temperature-scale before you ship.

## 3. The test set is lying
Leakage, distribution shift, and stale labels all inflate offline numbers. Hold
out a *temporal* split and a *fresh* sample whenever you can.`,
  },
  {
    kind: "html",
    slug: "shipping-checklist",
    title: "My Pre-Ship Engineering Checklist",
    track: "engineering",
    date: "2026-02-14",
    summary:
      "The short list I run through before any service goes live — observability, rollback, and the boring things that save weekends.",
    tags: ["Checklist", "Reliability", "CI/CD"],
    readingMinutes: 4,
    body: `<h1>My Pre-Ship Engineering Checklist</h1>
<p>The boring things that save weekends. I run this before anything goes live.</p>
<h2>Observability</h2>
<ul>
  <li>Structured logs with a request/trace id on every path</li>
  <li>RED metrics (Rate, Errors, Duration) dashboarded</li>
  <li>An alert that pages on the symptom, not the cause</li>
</ul>
<h2>Safety</h2>
<ul>
  <li>One-command rollback, tested</li>
  <li>Feature flag for the risky change</li>
  <li>Backfill/replay plan if data is involved</li>
</ul>
<blockquote>If you can't roll it back in under a minute, you didn't ship it — you gambled.</blockquote>`,
  },
];

export const postsByTrack = (trackId: string) =>
  blogPosts
    .filter((p) => p.track === trackId)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const allPostsSorted = () =>
  [...blogPosts].sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const postBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const trackById = (id: string) => blogTracks.find((t) => t.id === id);
