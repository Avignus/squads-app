import api from '../Config/api';

const authenticate = async (params) => {
  api
    .post('/auth/authenticate', params)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      api.defaults.headers.common = { Authorization: `Bearer ${token}` };
      // setSigned(true);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const constructData = (e, email, password) => {
  e.preventDefault();
  let data = {};
  data.email = email;
  data.password = password;
  authenticate(data);
};

export default constructData;
