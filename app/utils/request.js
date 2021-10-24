import auth from 'helpers/auth';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 403) {
    return response;
  }
  if (response.status === 401) {
    auth.logout();
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(`${process.env.API}${url}`, options)
    .then(checkStatus)
    .then(parseJSON);
}

function apiGetRequest(url, method) {
  return request(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

function apiRequest(url, method, options = {}) {
  return request(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(options),
  });
}

export function get(url) {
  return apiGetRequest(url, 'GET');
}

export function puts(url, options = {}) {
  return apiRequest(url, 'PUT', options);
}

export function post(url, options = {}) {
  return apiRequest(url, 'POST', options);
}

export function patch(url, options = {}) {
  return apiRequest(url, 'PATCH', options);
}

export function destroy(url, options = {}) {
  return apiRequest(url, 'DELETE', options);
}
