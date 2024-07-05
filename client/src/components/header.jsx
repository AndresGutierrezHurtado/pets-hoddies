import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header({ onInputChange }) {
  const [claseForm, setClaseForm] = useState("hidden");
  const [userData, setUserData] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    onInputChange(event);
  };

  const hadleSubmit = (event) => {
    event.preventDefault();
    navigate("/productos");
  }


  useEffect(() => {

    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserData(decodedToken);

        if (decodedToken) {
          const expiration = new Date(decodedToken.exp * 1000);
          const currentTime = new Date();
        
          if (currentTime > expiration) {
            alert("Tu sesión ha caducado.");
            localStorage.removeItem('token');
            localStorage.removeItem('carrito');
            setUserData(null);
            navigate('/');
          } 
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
        localStorage.removeItem('token');
        setUserData(null);
        navigate('/');
      }
    }
  }, [])
  
  useEffect(() => {
    if (location.pathname === "/tallas") {
      setClaseForm("hidden");
    } else {
      setClaseForm("hidden md:block");
    }
  }, [location.pathname]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 px-3">
        <nav className="container max-w-7xl py-1 mx-auto">
          <div className="flex justify-between items-center border-b-2 border-dashed">
            <Link to="/">
            <img src="/img/pets-hoddies.png" className="h-[60px] sm:h-[70px]" alt="logo-navbar" />
            </Link>

            <form className={claseForm + " relative"}>
              <input type="text" placeholder="Buscar..." className="rounded-md border border-gray-200 py-2.5 px-3 sm:text-sm w-96 focus:outline-none focus:border-orange-400" onChange={handleInputChange}/>

              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button className="text-gray-600 hover:text-gray-700" onClick={hadleSubmit}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </span>
            </form>

            <div className="flex justify-center items-center gap-4">
              <Link to={(userData) ? "/profile/user" : "/login"} className='flex gap-3 items-center justify-center'>
                {userData ? (
                  <span>{userData.username}</span>
                ) : (
                  <span className='text-sm'>
                    Inicia sesión <br />
                    Regístrate
                  </span>
                )}
                / <i className="fa-solid fa-paw text-2xl sm:text-3xl rotate-12"></i>
              </Link>
            </div>
          </div>
          <ul className="flex w-full justify-center items-center gap-5 md:gap-8 py-2 pt-3 text-md sm:text-lg font-semibold tracking-tight">              
              <li className="duration-300 hover:text-orange-400 hover:scale-105">
                <Link to="/">Inicio</Link>
              </li>
              <li className="duration-300 hover:text-orange-400 hover:scale-105">
                <Link to="/productos">Productos</Link>
              </li>
              <li className="duration-300 hover:text-orange-400 hover:scale-105">
                <Link to="/conocenos" className="hidden sm:block">Conócenos</Link>
              </li>
              <li className="duration-300 hover:text-orange-400 hover:scale-105">
                <Link to="/tallas" className="flex capitalize sm:normal-case">
                  <span className="hidden sm:block pr-1 "> ¿Cuál es mi </span> talla <span className="hidden sm:block">?</span>
                </Link>
              </li>              
          </ul>
        </nav>
    </header>
  )
}

export default Header;