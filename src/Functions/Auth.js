import api from '../Config/api';
import { Redirect } from 'react-router-dom';

const authenticate = (params) => {
  let token = localStorage.getItem('token');
  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  api
    .post('/auth/authenticate', params)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      api.defaults.headers.common = { Authorization: `Bearer ${token}` };
    })
    .catch((err) => {
      console.log(err);
    });
};

export default authenticate;
