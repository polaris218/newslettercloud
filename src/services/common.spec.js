import fetchMock from 'fetch-mock';
import nodeFetch from 'node-fetch';
import { request } from './common';

nodeFetch.default = fetchMock;

const URL = '/test';
const BASE_URL = '/api/v3';

describe('services/common/request', () => {
  describe('when response status is "200"', () => {
    const mockResponse = { name: 'mock response', items: [] };

    beforeEach(() => {
      fetchMock.get(`${BASE_URL}${URL}`, mockResponse);
    });

    afterAll(() => {
      fetchMock.reset();
    });

    it('should return parsed JSON as object', async () => {
      const response = await request({ url: URL });
      expect(response).toEqual(mockResponse);
    });
  });

  describe('when response status is "404"', () => {
    beforeEach(() => {
      fetchMock.get(`${BASE_URL}${URL}`, 404);
    });

    afterAll(() => {
      fetchMock.reset();
    });

    it('should return Error 404', async () => {
      const response = await request({ url: URL });
      expect(response instanceof Error).toBe(true);
      expect(response.status).toBe(404);
      expect(response.message).toBe('Not Found');
    });
  });

  describe('when response status is "400"', () => {
    beforeEach(() => {
      fetchMock.get(`${BASE_URL}${URL}`, 400);
    });

    afterAll(() => {
      fetchMock.reset();
    });

    it('should return Error 400', async () => {
      const response = await request({ url: URL });
      expect(response instanceof Error).toBe(true);
      expect(response.status).toBe(400);
      expect(response.message).toBe('Bad Request');
    });
  });

  describe('when response status is "500"', () => {
    beforeEach(() => {
      fetchMock.get(`${BASE_URL}${URL}`, 500);
    });

    afterAll(() => {
      fetchMock.reset();
    });

    it('should return Error 500', async () => {
      const response = await request({ url: URL });
      expect(response instanceof Error).toBe(true);
      expect(response.status).toBe(500);
      expect(response.message).toBe('Internal Server Error');
    });
  });
});
