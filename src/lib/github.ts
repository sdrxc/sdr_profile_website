// Server-side GitHub data layer for the Coder persona.
// Pulls public profile + repo + activity data from the GitHub REST API and
// aggregates it into a compact shape for the KPI board. A GITHUB_TOKEN is
// optional — without it we run against the (lower) unauthenticated rate limit,
// which is fine for a low-traffic personal site behind Next's data cache.

export const GITHUB_USERNAME = "sdrxc";

const API = "https://api.github.com";

export type GitHubProfile = {
  login: string;
  name: string | null;
  avatarUrl: string;
  htmlUrl: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  publicGists: number;
  createdAt: string;
};

export type GitHubRepo = {
  name: string;
  htmlUrl: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
  topics: string[];
};

export type LanguageStat = { name: string; count: number };

export type GitHubBoard = {
  configured: boolean;
  profile: GitHubProfile;
  totalStars: number;
  totalForks: number;
  languages: LanguageStat[];
  topRepos: GitHubRepo[];
  recentPushes: number; // PushEvents in the public activity window
  recentCommits: number; // commits inside those pushes
  lastActiveAt: string | null;
  fetchedAt: string;
};

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

// Revalidate hourly — GitHub stats don't need to be real-time, and this keeps
// us comfortably under the rate limit even unauthenticated.
const fetchOpts = { headers: headers(), next: { revalidate: 3600 } } as const;

export async function getGitHubBoard(): Promise<GitHubBoard | null> {
  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`${API}/users/${GITHUB_USERNAME}`, fetchOpts),
      fetch(`${API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`, fetchOpts),
      fetch(`${API}/users/${GITHUB_USERNAME}/events/public?per_page=100`, fetchOpts),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const u = await userRes.json();
    const repos: any[] = await reposRes.json();
    const events: any[] = eventsRes.ok ? await eventsRes.json() : [];

    const profile: GitHubProfile = {
      login: u.login,
      name: u.name,
      avatarUrl: u.avatar_url,
      htmlUrl: u.html_url,
      bio: u.bio,
      company: u.company,
      location: u.location,
      blog: u.blog || null,
      followers: u.followers ?? 0,
      following: u.following ?? 0,
      publicRepos: u.public_repos ?? 0,
      publicGists: u.public_gists ?? 0,
      createdAt: u.created_at,
    };

    const owned = repos.filter((r) => !r.fork);

    const totalStars = owned.reduce((a, r) => a + (r.stargazers_count ?? 0), 0);
    const totalForks = owned.reduce((a, r) => a + (r.forks_count ?? 0), 0);

    const langCounts = new Map<string, number>();
    for (const r of owned) {
      if (r.language) langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
    }
    const languages: LanguageStat[] = [...langCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const topRepos: GitHubRepo[] = [...owned]
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0) ||
        +new Date(b.pushed_at) - +new Date(a.pushed_at))
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        htmlUrl: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count ?? 0,
        forks: r.forks_count ?? 0,
        pushedAt: r.pushed_at,
        topics: r.topics ?? [],
      }));

    const pushEvents = events.filter((e) => e.type === "PushEvent");
    const recentPushes = pushEvents.length;
    const recentCommits = pushEvents.reduce(
      (a, e) => a + (e.payload?.commits?.length ?? e.payload?.size ?? 0),
      0,
    );
    const lastActiveAt = events[0]?.created_at ?? null;

    return {
      configured: true,
      profile,
      totalStars,
      totalForks,
      languages,
      topRepos,
      recentPushes,
      recentCommits,
      lastActiveAt,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
