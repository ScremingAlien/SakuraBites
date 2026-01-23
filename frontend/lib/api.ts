'use server';

import axios from "axios";
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';


export const FETCH = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})



type FetchOptions = {
  cache?: RequestCache;
  revalidate?: number;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: boolean;
};

export async function refreshApi(tag: string) {
  revalidateTag(tag, 'default');
}

let api_url = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  url: string,
  options: FetchOptions = {},
  defaultOptions?: RequestInit
): Promise<T> {
  const cookieStore = await cookies();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (options.token) {
    const token = cookieStore.get('sukrabites_token')?.value;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const requestInit: RequestInit = {
    method: options.method ?? 'GET',
    headers,
    cache: options.revalidate
      ? 'force-cache'
      : options.cache ?? 'no-store',
    next: {
      revalidate: options.revalidate,
    },
    ...defaultOptions,
  };

  if (options.method && options.method !== 'GET' && options.body !== undefined) {
    requestInit.body = JSON.stringify(options.body);
  }

  const res = await fetch(api_url + url, requestInit);

  // 🔑 Always handle non-OK explicitly
  if (!res.ok) {
    let errorMessage = `API Error: ${res.status}`;

    try {
      const errorBody = await res.json();
      errorMessage = errorBody?.message ?? errorMessage;
    } catch {
      // ignore JSON parse failure
    }

    throw new Error(errorMessage);
  }

  // Some APIs return 204 No Content
  if (res.status === 204) {
    return null as T;
  }

  return res.json() as Promise<T>;
}