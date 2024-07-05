import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [dataEdit, setDataEdit] = useState(false);
  const [sessionData, setSessionData] = useState(null);

  const {id} = useParams();
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {      
      const decodedToken = jwtDecode(token);
      if (decodedToken.id && decodedToken.rol) {

        const encodedId = id ? atob(id) : decodedToken.id; 

        if (encodedId != decodedToken.id && decodedToken.rol != 2 ) {
          console.log('No tienes permisos para hacer eso.');
          navigate('/');
        }

        setSessionData(decodedToken);

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({ id: encodedId })
        };
        fetch('http://localhost:3000/profile', requestOptions)
          .then(response => { return response.json(); })
          .then(data => { 
            setUserData(data);
          })
          .catch(error => { console.error('Error al obtener información:', error); });
      } else {
        console.error('Token de autorización no contiene información de usuario');
        console.log(token)
        localStorage.removeItem('token');
        localStorage.removeItem('carrito');
        setUserData(null);
        navigate('/');
      }      
    } else {
      console.error('Token de autorización no disponible');
      navigate('/');
    }
  }, [id]);
  
  const handleSubmit = () => {
    const token = localStorage.getItem('token');

    const formData = {
      id: userData.id,
      fullname: document.getElementById("fullname").value,
      email: document.getElementById("email").value,
      username: document.getElementById("username").value,
      phonenumber: document.getElementById("phonenumber").value,
      address: document.getElementById("address").value
    }

    const requestOptions = {
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    };

    fetch('http://localhost:3000/profile/user/update', requestOptions)    
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', data.token)
      setUserData({
        ...userData,
        fullName: formData.fullname,
        email: formData.email,
        username: formData.username,
        telefono: formData.phonenumber,
        address: formData.address,
      });
      alert("La información fue actualizada correctamente.");
    })
    .catch(error => console.error('Error al actualizar información:', error));
  }
  
  const handleEdit = () => {
    if (dataEdit) {
      if (confirm("¿Quieres volver atrás y perder los cambios?")){
        document.getElementById("fullname").value =userData.fullName;
        document.getElementById("email").value =userData.email;
        document.getElementById("username").value =userData.username;
        document.getElementById("phonenumber").value =userData.telefono;
        document.getElementById("address").value =userData.address;

        setDataEdit(false);
      }
    } else {
      setDataEdit(true);
    }
  };

  const handleLogout = () => {
    if(confirm("¿Quieres cerrar sesión?")){
      localStorage.removeItem('token');
      localStorage.removeItem('carrito');
      setUserData(null);
      navigate('/');
    }
  };

  return (
    <>
      <div className="w-full sm:10/12 md:w-8/12 lg:w-5/12 my-5">
        <span className="w-full flex justify-between items-center px-4 sm:px-10">
        <h1 className="font-bold text-2xl ">PERFIL DEL USUARIO:</h1>        
        <Link to="/">
          <i className="fa-solid fa-angle-left size-[35px] border border-black rounded-full justify-center items-center flex text-xl cursor-pointer duration-300 hover:bg-black/[0.3]"></i>
        </Link>  
        </span>
        <div className="bg-white shadow-lg w-full p-4 py-5 sm:p-10 rounded-[15px] my-3">
          {(userData && sessionData) ? (
            <>
              <form className="flex flex-col gap-4">
                <div className="w-full">
                  <label htmlFor="fullname" className="font-bold uppercase text-md">Nombre completo:</label>
                  <input type="text" id="fullname" className="border mt-1 px-2 p-1 rounded-md w-full" defaultValue={userData.fullName} disabled={!dataEdit} />
                </div>
                <div className="w-full"> 
                  <label htmlFor="email" className="font-bold uppercase text-md">Correo electrónico:</label>
                  <input type="email" id="email" className="border px-2 p-1 rounded-md w-full" defaultValue={userData.email} disabled={!dataEdit} />
                </div>
                <div className="w-full"> 
                  <label htmlFor="username" className="font-bold uppercase text-md">Usuario:</label>
                  <input type="text" id="username" className="border px-2 p-1 rounded-md w-full" autoComplete="username" defaultValue={userData.username} disabled={!dataEdit} />
                </div>
                <div className="w-full"> 
                  <label htmlFor="phonenumber" className="font-bold uppercase text-md">Numero telefónico:</label>
                  <input type="number" id="phonenumber" className="border px-2 p-1 rounded-md w-full" defaultValue={userData.telefono} disabled={!dataEdit} />
                </div>
                <div className="w-full"> 
                  <label htmlFor="address" className="font-bold uppercase text-md">Dirección:</label>
                  <input type="text" id="address" autoComplete="address" className="border px-2 p-1 rounded-md w-full" defaultValue={userData.address} disabled={!dataEdit} />
                </div>
              </form>
              <div className="flex pt-10 gap-3 justify-between">
                {sessionData.id == userData.id && <button onClick={handleLogout} className="px-3 p-1 rounded-lg bg-red-500 font-bold text-white border-2 border-red-500 hover:bg-red-600 duration-300">Cerrar sesión</button> }
                <div className="flex gap-3">
                  {(dataEdit) ? (
                    <button onClick={handleEdit} className="px-3 p-1 rounded-lg bg-orange-400 font-bold bg-white border-2 border-orange-400 text-orange-400 hover:bg-gray-200 duration-300">Cancelar</button>
                  ) : (                    
                  <button onClick={handleEdit} className="px-3 p-1 rounded-lg bg-orange-400 font-bold text-white border-2 border-orange-400 hover:bg-orange-500 duration-300">Editar</button>
                  )}
                  
                  {(dataEdit) && ( <button onClick={handleSubmit} className="px-3 p-1 rounded-lg bg-orange-400 font-bold text-white">Guardar</button> )}
                </div>
              </div>
              
                {(sessionData.rol == 2) && (
                  <div className="flex gap-3 w-full justify-end pt-5">
                    <Link to="/list/users"> <button className="px-3 p-1 rounded-lg duration-300 border-2 border-black bg-white font-bold text-black hover:bg-gray-200">Usuarios</button></Link>
                    <Link to="/list/products"> <button className="px-3 p-1 rounded-lg duration-300 border-2 border-black bg-white font-bold text-black hover:bg-gray-200">Productos</button></Link>
                  </div>
                ) }
          </>            
          ):(
            <div>cargando...</div>
          ) }
        </div>            
      </div>
    </>
  );
}

export { UserProfile } ;
