import { describe, it, expect, vi, beforeEach, type MockInstance } from 'vitest';
import fetcher from '../fetcher';

describe('fetcher', () => {
  let fetchSpy: {
    mockResolvedValue: (value: any) => MockInstance;
    mockRejectedValue: (value: any) => MockInstance;
  };

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, 'fetch');
  });

  it('should call fetch with the correct arguments and return the expected result for GET', async () => {
    const mockResponse = {
      headers: new Headers(),
      json: async () => ({ key: 'value' }),
      ok: true,
    };

    fetchSpy.mockResolvedValue(mockResponse);

    const result = await fetcher.get('https://example.com');

    expect(global.fetch).toHaveBeenCalledWith('https://example.com', {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    expect(result).toEqual({ headers: mockResponse.headers, data: { key: 'value' } });
  });

  it('should call fetch with the correct arguments and return the expected result for POST', async () => {
    const mockResponse = {
      headers: new Headers(),
      json: async () => ({ key: 'value' }),
      ok: true,
    };

    fetchSpy.mockResolvedValue(mockResponse);

    const result = await fetcher.post('https://example.com', { key: 'value' });

    expect(global.fetch).toHaveBeenCalledWith('https://example.com', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ key: 'value' }),
    });
    expect(result).toEqual({ headers: mockResponse.headers, data: { key: 'value' } });
  });

  it('should throw an error when the response is not ok', async () => {
    const mockResponse = {
      headers: new Headers(),
      json: async () => ({ error: 'Bad Request' }),
      ok: false,
    };

    fetchSpy.mockResolvedValue(mockResponse);

    await expect(fetcher.get('https://example.com')).rejects.toEqual({ error: 'Bad Request' });
  });

  it('should return only headers when the method is DELETE', async () => {
    const mockResponse = {
      headers: new Headers(),
      ok: true,
    };

    fetchSpy.mockResolvedValue(mockResponse);

    const result = await fetcher.delete('https://example.com');

    expect(global.fetch).toHaveBeenCalledWith('https://example.com', {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    expect(result).toEqual({ headers: mockResponse.headers });
  });

  it('should call fetch with the correct arguments and return the expected result for PUT', async () => {
    const mockResponse = {
      headers: new Headers(),
      json: async () => ({ key: 'new value' }),
      ok: true,
    };

    fetchSpy.mockResolvedValue(mockResponse);

    const result = await fetcher.put('https://example.com', { key: 'new value' });

    expect(global.fetch).toHaveBeenCalledWith('https://example.com', {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ key: 'new value' }),
    });
    expect(result).toEqual({ headers: mockResponse.headers, data: { key: 'new value' } });
  });

  it('should throw an error when fetch fails', async () => {
    fetchSpy.mockRejectedValue(new Error('Network error'));

    await expect(fetcher.get('https://example.com')).rejects.toThrow('Network error');
  });
});
