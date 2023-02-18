import axios from 'axios';

const BASE_URL = 'https://fs-blog-server.onrender.com';
// const BASE_URL = 'http://localhost:5000';

export const RegisterUser = async (username, displayname, password) => {
  const request = {
    method: 'post',
    url: BASE_URL.concat('/auth/registration'),
    data: { username, displayname, password },
  };
  const response = await axios(request);
  return response;
};

export const Login = async (username, password) => {
  const request = {
    method: 'post',
    url: BASE_URL.concat('/auth/login'),
    data: { username, password },
  };
  const response = await axios(request);
  localStorage.setItem('token', response.data);
  return response;
};

export const Logout = async () => {
  const token = localStorage.getItem('token');
  const request = {
    method: 'get',
    url: BASE_URL.concat('/auth/logout'),
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios(request);
  return response;
};

// export const UpdateUserNameById = async(username, id) => {
//   const request = {
//     method: 'put',
//     url: BASE_URL.concat(`/user/updateUsername/${id}`),
//     data: { username }
//   };
//   const response = await axios(request);
//   return response;
// };

// export const UpdateDisplayNameById = async(displayname, id) => {
//   const request = {
//     method: 'put',
//     url: BASE_URL.concat(`/user/updateDisplayname/${id}`),
//     data: { displayname }
//   };
//   const response = await axios(request);
//   return response;
// };
