type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetcherResponse {
  headers: Headers;
  data?: any;
}

async function fetcher(
  method: Method,
  url: string,
  data?: any,
  headers: Record<string, string> = {},
): Promise<FetcherResponse> {
  const headerList = {
    ...headers,
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    method,
    headers: new Headers(headerList),
  };

  if (method === 'POST' || method === 'PUT') {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const respJSON = await response.json();
      
      throw respJSON;
    }

    if (method === 'DELETE') {
      return { headers: response.headers };
    }

    const respJSON = await response.json();
    return { headers: response.headers, data: respJSON };
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
}

export default {
  get: (url: string, headers?: Record<string, string>) => fetcher('GET', url, undefined, headers),
  post: (url: string, body: any, headers?: Record<string, string>) =>
    fetcher('POST', url, body, headers),
  delete: (url: string, headers?: Record<string, string>) =>
    fetcher('DELETE', url, undefined, headers),
  put: (url: string, body: any, headers?: Record<string, string>) =>
    fetcher('PUT', url, body, headers),
};
