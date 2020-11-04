import React, { useEffect, useState } from 'react';

import '../Components/Styles/Login.css';
import logo from '../Assets/logo.png';
import FormRegistry from '../Components/FormRegistry';
import FormLogin from '../Components/FormLogin';
function Login() {
  const [isSigned, setSigned] = useState(false);
  const [shouldRotate, setRotation] = useState('');

  useEffect(() => {
    if (isSigned) {
      console.log('autenticado');
    }
  }, [isSigned, shouldRotate]);

  return (
    <div className="wrapper">
      <img src={logo} className="img-logo" />
      <div className={`flip-card${shouldRotate}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <FormLogin setRotation={() => setRotation('-rotate')} />
          </div>
          <div className="flip-card-back">
            <FormRegistry setRotation={() => setRotation('-reverse')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
