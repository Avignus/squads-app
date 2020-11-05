import React, { useEffect, useState } from 'react';
import '../Components/Styles/Login.css';
import authenticate from '../Functions/Auth';
import { Redirect } from 'react-router-dom';
function FormLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signed, setSigned] = useState(false);
  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // const getToken = (token, props) => {
  //   if (token) {
  //     props.setToken(token);
  //   }
  // };

  // const setToken = async () => {
  //   const token = await authenticate(email, password);
  //   console.log(props);
  //   console.log(token);
  //   if (token) {
  //     props.setToken();
  //   }
  // };

  const constructData = async (e) => {
    e.preventDefault();
    let params = { email, password };
    let res = await authenticate(params);
    console.log(res);
    props.setToken();
  };
  return (
    <form
      onSubmit={(e) => constructData(e, email, password)}
      className="form-login"
    >
      <input
        onChange={(e) => handleEmail(e)}
        className="input"
        placeholder="E-mail"
      ></input>
      <input
        onChange={(e) => handlePassword(e)}
        className="input"
        placeholder="Senha"
      ></input>
      <span onClick={() => props.setRotation('-rotate')} className="registry">
        Não tem uma conta? Cadastre-se.
      </span>
      <button className="button-form" className="button-form">
        Entrar
      </button>
    </form>
  );
}

export default FormLogin;
