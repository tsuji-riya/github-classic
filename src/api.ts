export async function listUserRepo(username: string, page: number) {
  return await fetchJson("https://api.github.com/users/" + username + "/repos?per_page=100");
}

async function fetchJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}