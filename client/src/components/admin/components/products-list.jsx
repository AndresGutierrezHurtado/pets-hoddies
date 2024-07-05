import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function ProductsList() {
  const [productos, setProductos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  const handleCreateNewProduct = () =>{
    
    const requestOptions = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }
    };
    fetch('http://localhost:3000/addnewproduct', requestOptions)
      .then(response => response.json())
      .then(data => {
        alert('Se ha creado nuevo producto.')
        location.reload()
      })
      .catch(error => console.error('Error al obtener productos:', error));
  }

  const handleDeleteProduct = (id, nombre) => {
    if (confirm("¿Seguro que quieres eliminar el producto: " + nombre + "?")) {

      const requestOptions = {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id}),
      };
      fetch('http://localhost:3000/deleteproduct', requestOptions)
        .then(response => response.json())
        .then(data => {
          alert("La información fue actualizada correctamente.");
          location.reload();
        })
        .catch(error => console.error('Error al obtener productos:', error));
    
    }
  }

  const handleEdit = (id) => {
    const encodedId = btoa(id);
    navigate(`/profile/product/${encodedId}`)
  } 

  const productosList = productos.map(p => {
    return (
        <tr className='h-[39px]' key={p.producto_id}>
          <td className='border border-black'>{p.producto_id}</td>
          <td className='border border-black'>{p.nombre}</td>
          <td className='border border-black hidden sm:table-cell'>{p.precio.toLocaleString('en-US')} COP</td>
          <td className='border border-black hidden sm:table-cell'>{p.stock}</td>
          <td className='border border-black '>
            <button className='border-2 bg-orange-400 border-orange-400 rounded-md px-3 text-orange-400 text-white font-bold mx-3' onClick={() => handleEdit(p.producto_id)}>Editar</button>
            <button className='border-2 border-orange-400 rounded-md px-3 text-orange-400 font-bold mx-3' onClick={() => handleDeleteProduct(p.producto_id, p.nombre)}>Eliminar</button>
          </td>
        </tr>
    );
  });
  return (
    <>
      <table className='w-full sm:w-10/12 text-center table-auto border-collapse border border-black'>
        <thead>
          <tr>
            <th className='border border-black bg-gray-200 px-3'>ID</th>
            <th className='border border-black bg-gray-200 px-3'>Nombre</th>
            <th className='border border-black bg-gray-200 px-3 hidden sm:table-cell'>Precio</th>
            <th className='border border-black bg-gray-200 px-3 hidden sm:table-cell'>Stock</th>
            <th className='border border-black bg-gray-200 px-3'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosList}
        </tbody>
      </table>
      <button className='border-2 bg-orange-400 border-orange-400 rounded-md px-3 text-orange-400 text-white font-bold mx-3 w-8/12 py-2' onClick={handleCreateNewProduct}>Agregar producto</button>
    </>
  )
}

export { ProductsList };
