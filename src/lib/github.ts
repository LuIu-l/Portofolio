export interface GithubProject {
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

const FEATURED_REPOS = ['Sppg-sistem', 'Pantau-dana', 'komunitasai'];
const USERNAME = 'LuIu-l';

// Override homepage link untuk setiap repo
const REPO_HOMEPAGE_OVERRIDES: Record<string, string | null> = {
  'Sppg-sistem': 'https://sppg-sistem.vercel.app/',
  'Pantau-dana': 'https://pantau-dana.vercel.app/',
  'komunitasai': null, // Komunitas hanya diarahkan ke GitHub
};

export async function getGithubProjects(): Promise<GithubProject[]> {
  const projects: GithubProject[] = [];

  for (const repoName of FEATURED_REPOS) {
    try {
      const project = await getGithubProject(repoName);
      if (project) {
        projects.push(project);
      }
    } catch (error) {
      console.warn(`Failed to fetch repo ${repoName}:`, error);
    }
  }

  return projects;
}

export async function getGithubProject(repoName: string): Promise<GithubProject | null> {
  const url = `https://api.github.com/repos/${USERNAME}/${repoName}`;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(url, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Repo ${repoName} not found.`);
        return null;
      }
      throw new Error(`GitHub API error: ${res.statusText}`);
    }

    const data = await res.json();
    const hasOverride = repoName in REPO_HOMEPAGE_OVERRIDES;
    return {
      name: data.name,
      description: data.description || "Tidak ada deskripsi.",
      html_url: data.html_url,
      homepage: hasOverride ? REPO_HOMEPAGE_OVERRIDES[repoName] : (data.homepage || null),
      language: data.language || null,
      topics: data.topics || [],
      stargazers_count: data.stargazers_count || 0,
      updated_at: data.updated_at,
      fork: data.fork,
    };
  } catch (error) {
    console.error(`Error fetching ${repoName}:`, error);
    return null;
  }
}
