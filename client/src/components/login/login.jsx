import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');
    
    if (token) {
      console.log('Ya has iniciado sesión.')
      navigate('/');
    }
  }) 

  useEffect(() => {
    if (location.pathname === "/login") {
      setRegisterVisible(false);
    } else if (location.pathname === "/register") {
      setRegisterVisible(true);
    } else {
      setRegisterVisible(false);
    }
  }, [location.pathname]);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const validatePhoneNumber = (input) => {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(input);
  };

  const handleLogin = async (userData = null, isFacebookLogin = false) => {
    try {
      if (isFacebookLogin) {
        if (userData.email == undefined){
          console.log('el correo no se obtuvo: ' + userData.email);
        } else {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName: userData.name, facebookId: userData.id , email: userData.email }),
          };
          
          fetch('http://localhost:3000/login/facebook', requestOptions)          
            .then(response => response.json())
            .then(data => {
              localStorage.setItem('token', data.token); 
              alert('Inicio de sesión exitoso');
              navigate('/');
            })
            .catch(error => { alert(error.message); });
        }
      } else {
      
        if (!username || !password) {
          alert('Por favor, complete todos los campos.');
          return;
        }      

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, contrasenainput: password }) 
        };

        fetch('http://localhost:3000/login', requestOptions)
          .then(response => response.json())
          .then(data => {
            localStorage.setItem('token', data.token); 
            alert('Inicio de sesión exitoso');
            navigate('/');
          })
          .catch(error => { alert(error.message); });
      }
      
    } catch (error) {
      if (error.message =="Failed to fetch") {
        alert('Error durante el inicio de sesión: No hay conexión con base de datos');        
      }else{
        alert('Error durante el inicio de sesión: ' + error.message);
      }
    }

  };

  const handleRegister = async () => {
    try {
      if (!fullName || !username || !email || !password || !phoneNumber) {
        alert('Por favor, complete todos los campos.');
        return;
      }

      if (!validateEmail(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
      }

      if (!validatePhoneNumber(phoneNumber)) {
        alert('Por favor, ingrese un número de teléfono válido.');
        return;
      }

      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: fullName,
          username: username,
          email: email,
          contrasena: password,
          telefono: phoneNumber,
          rol_id: 1,
        }),
      });

      if (response.ok) {
        alert('Registro completado');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert('Error durante el registro: ' + errorData.error);
      }

    } catch (error) {
      alert('Error durante el registro: ' + error.message);
    }
  };

  const toggleRegister = () => {
    setRegisterVisible(!isRegisterVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-400">
      <div className="w-[500px] mx-auto px-8 py-5 my-10 bg-white rounded-md shadow-md flex flex-col justify-center items-center">
        <Link to="/"> <img src="/img/Logo-circular.png" alt="Pet's Hoddies" className='cursor-pointer size-36'/> </Link>
        <h2 className="text-3xl font-bold  tracking-tight text-gray-800 uppercase pb-1">{isRegisterVisible ? 'CREA TU CUENTA' : 'INICIA SESIÓN'}</h2>
        <p>{isRegisterVisible ? 'Crea tu cuenta para unirte a nuestra comunidad.' : 'Accede a tu cuenta para disfrutar de una mejor experiencia.'}</p>

        <form className='w-full pt-8 pb-3 flex flex-col'>
          {isRegisterVisible && (
            <div className="mb-4">
              <input
                placeholder="Nombres completos"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <input
              autoComplete="username"
              placeholder="Usuario"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {isRegisterVisible && (
            <div className="mb-4">
              <input
                placeholder="Correo"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <input 
              autoComplete="current-password"
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {isRegisterVisible && (
            <div className="mb-4">
              <input
                placeholder="Teléfono"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          )}
          <button type="button" onClick={isRegisterVisible ? handleRegister : handleLogin} className="bg-orange-500 rounded-md font-semibold text-white px-4 py-2 my-4 hover:bg-orange-600 duration-300">
            {isRegisterVisible ? 'Registrar' : 'Iniciar Sesión'}
          </button>
          <p className="text-md font-semibold text-gray-800/[0.9] tracking-tight cursor-default">
            {isRegisterVisible ?
              <span>¿Ya tienes una cuenta? <Link to="/login" className='text-orange-400 hover:underline'>Inicia sesión.</Link></span> :
              <span>¿No tienes una cuenta? <Link to="/register" className='text-orange-400 hover:underline'>Regístrate.</Link></span>
            }
          </p>   
        </form>
      </div>
    </div>
  );
}

export default Login;
