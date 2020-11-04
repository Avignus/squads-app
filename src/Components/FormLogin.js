import React, { useEffect, useState } from 'react';
import '../Components/Styles/Login.css';
import constructData from '../Functions/Auth';

function FormLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <form className="form-login">
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
      <button
        onClick={(e) => constructData(e, email, password)}
        className="button-form"
        className="button-form"
      >
        Entrar
      </button>
    </form>
  );
}

export default FormLogin;
