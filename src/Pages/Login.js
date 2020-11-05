import React, { useEffect, useState } from 'react';

import '../Components/Styles/Login.css';
import logo from '../Assets/logo.png';
import FormRegistry from '../Components/FormRegistry';
import FormLogin from '../Components/FormLogin';
import { Redirect } from 'react-router-dom';
function Login(props) {
  const [shouldRotate, setRotation] = useState('');
  // const [token, setToken] = useState('');
  const [signed, setSigned] = useState(false);
  useEffect(() => {}, [signed]);

  const setToken = () => {
    console.log('executou');
    setSigned(true);
  };

  if (signed) {
    return <Redirect push to={'/main'} />;
  }

  return (
    <div className="wrapper">
      <img src={logo} className="img-logo" />
      <div className={`flip-card${shouldRotate}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <FormLogin
              setToken={(e) => setToken(e)}
              setRotation={() => setRotation('-rotate')}
            />
          </div>
          <div className="flip-card-back">
            <FormRegistry
              setRegistry={(e) => setToken(e)}
              setRotation={() => setRotation('-reverse')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
