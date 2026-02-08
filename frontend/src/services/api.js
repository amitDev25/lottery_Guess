const API_BASE = import.meta.env.VITE_API_URL;


export async function searchNumbers(prefix) {
  const res = await fetch(`${API_BASE}/api/search/${prefix}`);
  if (!res.ok) throw new Error("API Error");
  return res.json();
}


export async function fetchDetails(number) {
  const res = await fetch(`${API_BASE}/api/details/${number}`);
  if (!res.ok) throw new Error("API Error");
  return res.json();
}

export async function fetchSheet() {
  const res = await fetch(`${API_BASE}/api/sheet`);
  if (!res.ok) throw new Error("Failed to fetch sheet");
  return res.json();
}