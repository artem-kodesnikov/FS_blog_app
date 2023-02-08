import axios from 'axios';

const BASE_URL = 'https://basic-fullstack-auth-server.onrender.com';

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
