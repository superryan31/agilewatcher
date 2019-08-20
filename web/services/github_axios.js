import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.githubBaseUrl
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.interceptors.request.use(req => {
  req.headers.Authorization = 'Bearer ' + localStorage.getItem("github_token");
  return req;
});
export default instance;
