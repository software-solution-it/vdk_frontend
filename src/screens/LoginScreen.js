import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import background from '../assets/background_login.jpeg';
import checkIcon from '../assets/check_icon.png';
import authService from '../services/AuthService';
import './LoginScreen.css';
import { TokenService } from '../services/TokenService';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [showSmsCodeScreen, setShowSmsCodeScreen] = useState(false);
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);
  const [showConfirmationScreen, setShowConfirmationScreen] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [smsCodeError, setSmsCodeError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    if (!validateEmail(email)) {
      setEmailError('E-mail inválido');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      const response = await authService.login(email, password);
      setShowSmsCodeScreen(true);
    } catch (error) {
      if (error.response && error.response.status !== 200) {
        setGeneralError('Usuário ou senha inválido. Tente novamente.');
      } else {
        setGeneralError('Erro ao fazer login. Verifique suas credenciais.');
      }
    }
  };

  const handleSendSmsCode = async (e) => {
    e.preventDefault();
    setSmsCodeError('');

    try {
      const response = await authService.verifyLoginCode(email, smsCode);
      if (response.token) {
        TokenService.setToken(response.token);
        navigate('/dashboard');
      }
    } catch (error) {
      setSmsCodeError('Código inválido. Tente novamente.');
    }
  };

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();
    setEmailError('');

    if (!validateEmail(email)) {
      setEmailError('E-mail inválido');
      return;
    }

    try {
      await authService.forgotPassword(email);
      setShowConfirmationScreen(true);
    } catch (error) {
      setGeneralError('Erro ao iniciar a recuperação de senha. Tente novamente.');
    }
  };

  const handleResendCode = async (e) => {
    e.preventDefault();
    try {
      await authService.resendCode(email);
    } catch (error) {
      console.error('Erro ao reenviar o código de verificação', error);
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `radial-gradient(100.27% 85.1% at 100% 50%, rgba(6, 103, 214, 0.80) 41.9%, rgba(3, 54, 112, 0.00) 100%), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="card login-card">
        <div className="card-body">
          <div className="text-center mb-4 image text-center d-flex justify-content-center w-100">
            <img src={logo} alt="Logo" className="mb-3" />
          </div>

          {showConfirmationScreen ? (
            <>
              <div className="text-center d-flex justify-content-center w-100 my-3">
                <img src={checkIcon} alt="Check" className="mb-3" style={{ width: '100px', height: '100px' }} />
              </div>
              <p className="text-center">Enviado! Verifique sua caixa de entrada para o e-mail de recuperação.</p>
              <div className="text-center d-flex justify-content-center w-100">
                <a href="#" className="link-primary text-center" onClick={handleResendCode}>
                  Não encontrei, enviar novamente
                </a>
              </div>
            </>
          ) : showPasswordRecovery ? (
            <>
              <h5 className="card-title">Recuperação de senha</h5>
              <p>Informe o e-mail para enviar o formulário de recuperação.</p>
              <form onSubmit={handlePasswordRecovery}>
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    required
                  />
                  {emailError && <div className="text-danger">{emailError}</div>}
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Enviar
                  </button>
                </div>
              </form>
            </>
          ) : showSmsCodeScreen ? (
            <>
              <h5 className="card-title">Código de autenticação</h5>
              <p>Digite o código que você recebeu por e-mail.</p>
              <form onSubmit={handleSendSmsCode}>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${smsCodeError ? 'is-invalid' : ''}`}
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    placeholder="Código"
                    required
                  />
                  {smsCodeError && <div className="text-danger">{smsCodeError}</div>}
                </div>
                <div className=" mb-3">
                  <a href="#" className="link-primary" onClick={handleResendCode}>
                    Não recebi, enviar novamente
                  </a>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Enviar
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h5 className="card-title">Login</h5>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    required
                  />
                  {emailError && <div className="text-danger">{emailError}</div>}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    required
                  />
                  {passwordError && <div className="text-danger">{passwordError}</div>}
                </div>
                {generalError && <div className="text-danger mb-3">{generalError}</div>}
                <div className="mb-3">
                  <a href="#" className="link-primary" onClick={() => setShowPasswordRecovery(true)}>
                    Esqueci minha senha
                  </a>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Entrar
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
