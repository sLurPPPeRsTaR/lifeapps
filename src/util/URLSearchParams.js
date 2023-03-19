class URLSearchParams {
  /**
   *
   * @param {?Object} params the query string search params
   */
  constructor(params) {
    this.params = { ...params } ?? {};
  }

  /**
   *
   * @param {string} key
   * @param {string} value
   */
  append(key, value) {
    this.params[key] = value;
  }

  toString() {
    let queryString = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(this.params)) {
      if (queryString.length > 0) {
        queryString = queryString.concat('&');
      }
      queryString = queryString.concat(`${key}=${value}`);
    }
    return queryString;
  }
}

export default URLSearchParams;
