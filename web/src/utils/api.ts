const baseUrl = process.env.REACT_APP_BASE_URL;

export async function get(
  input: string,
  init?: RequestInit | undefined
): Promise<Response> {
  const apiUrl = `${baseUrl}${input}`;
  return await fetch(apiUrl, init);
}

export async function post(
  input: string,
  body: { [params: string]: any }
): Promise<Response> {
  const apiUrl = `${baseUrl}${input}`;
  return await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function put(
  input: string,
  body: { [params: string]: any }
): Promise<Response> {
  const apiUrl = `${baseUrl}${input}`;
  return await fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function deleteAsync(input: string): Promise<Response> {
  const apiUrl = `${baseUrl}${input}`;
  return await fetch(apiUrl, {
    method: "DELETE",
  });
}
