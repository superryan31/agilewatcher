import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.githubBaseUrl
});
// export default () => {
//   return axios.create({
//     baseURL: `https://api.github.com`,
//     withCredentials: false,
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   })
// }
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.interceptors.request.use(req => {
  req.headers.Authorization = 'Bearer ' + localStorage.getItem("github_token");
  return req;
});
export default instance;
