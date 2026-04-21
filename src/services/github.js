export async function fetchGitHubRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed with status ${response.status}`);
  }

  const repos = await response.json();

  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      topics: repo.topics || [],
    }));
}