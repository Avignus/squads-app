import React, { useEffect, useState } from 'react';
import '../Components/Styles/Login.css';
import constructData from '../Functions/Register';

const Form = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmation = (e) => {
    setConfirmation(e.target.value);
  };

  const validatePassword = (e) => {
    if (password === confirmation) {
      console.log('funcionou!');
      constructData(e, email, password);
      props.setRegistry();
    }
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
      <input
        onChange={(e) => handleConfirmation(e)}
        className="input"
        placeholder="Confirmar senha"
      ></input>
      <span onClick={() => props.setRotation('-reverse')} className="registry">
        Voltar para o início
      </span>
      <button
        onClick={(e) => validatePassword(e)}
        className="button-form"
        className="button-form"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default Form;
