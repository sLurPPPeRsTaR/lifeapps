import { describe, expect, test } from '@jest/globals';
import URLSearchParams from 'ca-util/URLSearchParams';

describe('URLSearchParams', URLSearchParamsTestSuite);

function URLSearchParamsTestSuite() {
  describe('given an empty initial params', () => {
    test('should return empty string', () => {
      const query = new URLSearchParams();
      expect(query.toString()).toBe('');
    });

    test('should return single query string', () => {
      const query = new URLSearchParams();
      query.append('value', '3');
      expect(query.toString()).toBe('value=3');
    });

    test('should return multiple query string', () => {
      const query = new URLSearchParams();
      query.append('value', '3');
      query.append('age', '22');
      query.append('food', 'rendang');
      expect(query.toString()).toBe('value=3&age=22&food=rendang');
    });
  });

  describe('given a non empty initial params', () => {
    test('should return all in initial params', () => {
      const params = { value: '3', age: '22' };
      const query = new URLSearchParams(params);
      expect(query.toString()).toBe('value=3&age=22');
    });

    test('should return all in params', () => {
      const params = { value: '3', age: '22' };
      const query = new URLSearchParams(params);
      query.append('food', 'rendang');
      expect(query.toString()).toBe('value=3&age=22&food=rendang');
    });

    test('should not modify original param', () => {
      const params = { value: '3', age: '22' };
      const query = new URLSearchParams(params);
      query.append('food', 'rendang');
      expect(params).not.toHaveProperty('food');
    });
  });
}
