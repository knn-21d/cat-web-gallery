export async function fetchWrapper<T>(url: string) {
  const resp = await fetch(url, { headers: { accept: 'application/json' } });
  const json = await resp.json();
  return json as T;
}
