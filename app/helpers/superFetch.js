import { apiConfig } from '../config';

const customHeader = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  //Authorization: 'Bearer '+localStorage.getItem('id_token') || undefined
});

const base = (method, url, data = {}) => {
  let body = undefined;
  if (method !== 'get') {
    body = JSON.stringify(data);
  } 
  return fetch(`${apiConfig.url}${url}`, {
    method,
    headers: customHeader(),
    body: body
  })
    .then(response => response.json())
    .then(res => res)
    .catch(error => ({ error: 'Server Error' }));
};
const SuperFetch = {};
['get', 'post', 'put', 'delete'].forEach(method => {
  SuperFetch[method] = base.bind(null, method);
});
export default SuperFetch;

