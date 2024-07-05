import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function UsersList() {
  const [usuarios, setUsuarios] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, [])

  const handleEdit = (id) => {
    const encodedId = btoa(id);
    navigate(`/profile/user/${encodedId}`);
  }

  const handleDeleteUser = (id, nombre) => {
    if (confirm('¿Estás seguro que quieres eliminar al usuario: ' + nombre + ' ?')) {
      const requestOptions = {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id}),
      };
      fetch('http://localhost:3000/deleteuser', requestOptions)
        .then(response => response.json())
        .then(data => {
          alert("La información fue actualizada correctamente.");
          location.reload();
        })
        .catch(error => console.error('Error al obtener productos:', error));
    }
  }

  const usersList = usuarios.map( u => {
    return(
      <tr className='h-[39px]' key={u.usuario_id}>
        <td className='border border-black'>{u.usuario_id}</td>
        <td className='border border-black'>{u.nombre}</td>
        <td className='border border-black hidden sm:table-cell'>{u.email}</td>
        <td className='border border-black'>{u.usuario}</td>
        <td className='border border-black hidden sm:table-cell'>{u.rol_id == 2 ? 'Administrador' : 'Cliente'}</td>
        <td className='border border-black '>
          <button className='border-2 bg-orange-400 border-orange-400 rounded-md px-3 text-orange-400 text-white font-bold mx-3' onClick={() => handleEdit(u.usuario_id)}>Editar</button>
          <button className='border-2 border-orange-400 rounded-md px-3 text-orange-400 font-bold mx-3' onClick={() => handleDeleteUser(u.usuario_id, u.nombre)}>Eliminar</button>
        </td>
      </tr>
    );

  })
  return (
    <>
      <table className='w-10/12 text-center table-auto border-collapse border border-black mb-5'>
        <thead>
          <tr>
            <th className='border border-black bg-gray-200 px-3'>ID</th>
            <th className='border border-black bg-gray-200 px-3'>Nombre</th>
            <th className='border border-black bg-gray-200 px-3 hidden sm:table-cell'>Correo</th>
            <th className='border border-black bg-gray-200 px-3'>Usuario</th>
            <th className='border border-black bg-gray-200 px-3 hidden sm:table-cell'>Rol</th>
            <th className='border border-black bg-gray-200 px-3'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usersList}
        </tbody>
      </table>
    </>
  )
}

export {UsersList};