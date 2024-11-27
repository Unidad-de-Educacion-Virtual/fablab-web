import { API_BASE_URL } from "../config";

const defaultHeaders: { [key: string]: string } = {
  "Content-Type": "application/json",
};

async function doRequest(url: string, init: RequestInit) {
  const res = await fetch(`${API_BASE_URL}/${url}`, init);

  const data = await res.json();

  if (data.error) {
    throw new Error(data.message);
  }

  if (!res.ok) {
    throw new Error(`Ha ocurrido un error ${res.status} ${res.statusText}`);
  }

  return data;
}

export async function getEntity<T>(
  base: string,
  queryParams = "",
  token?: string | null
) {
  const headers = {
    ...defaultHeaders,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const init: RequestInit = {
    method: "GET",
    headers,
  };

  const data = await doRequest(`${base}?${queryParams}`, init);

  return data as T[];
}

export async function getEntityById<T>(
  base: string,
  id: number,
  token?: string | null
) {
  const headers = {
    ...defaultHeaders,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const init: RequestInit = {
    method: "GET",
    headers,
  };

  const data = await doRequest(`${base}/${id}`, init);

  return data as T;
}

export async function createEntity<T, U>(
  base: string,
  body: T,
  token?: string | null
) {
  const headers = {
    ...defaultHeaders,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const init: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  const data = await doRequest(base, init);
  return data as U;
}

export async function updateEntity<T, U>(
  base: string,
  id: number,
  body: T,
  token?: string | null
) {
  const headers = {
    ...defaultHeaders,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const init: RequestInit = {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  };

  const data = await doRequest(`${base}/${id}`, init);
  return data as U;
}

export async function deleteEntity<T>(
  base: string,
  id: number,
  token?: string | null
) {
  const headers = {
    ...defaultHeaders,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const init: RequestInit = {
    method: "DELETE",
    headers,
  };

  const data = await doRequest(`${base}/${id}`, init);
  return data as T;
}
