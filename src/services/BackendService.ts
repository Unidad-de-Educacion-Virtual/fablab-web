import { API_BASE_URL } from "../config";

export async function getEntity<T>(base: string, queryParams = "") {
  const res = await fetch(`${API_BASE_URL}/${base}?${queryParams}`);
  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  if (!res.ok) {
    throw new Error(`Ha ocurrido un error ${res.status} ${res.statusText}`);
  }

  return data as T[];
}

export async function getEntityById<T>(base: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/${base}/${id}`);
  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  if (!res.ok) {
    throw new Error(`Ha ocurrido un error ${res.status} ${res.statusText}`);
  }

  return data as T;
}

export async function createEntity<T, U>(base: string, body: T) {
  const res = await fetch(`${API_BASE_URL}/${base}`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  if (!res.ok) {
    throw new Error(`Ha ocurrido un error ${res.status} ${res.statusText}`);
  }

  return data as U;
}

export async function updateEntity<T, U>(base: string, id: number, body: T) {
  const res = await fetch(`${API_BASE_URL}/${base}/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  if (!res.ok) {
    throw new Error(`Ha ocurrido un error ${res.status} ${res.statusText}`);
  }

  return data as U;
}

export async function deleteEntity<T>(base: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/${base}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  if (!res.ok) {
    throw new Error(`Ha ocurrido un error ${res.status} ${res.statusText}`);
  }

  return data as T;
}
