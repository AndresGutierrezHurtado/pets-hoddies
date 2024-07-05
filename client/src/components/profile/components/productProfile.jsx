import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';


function ProductProfile() {
  const [productData, setProductData] = useState(null);
  const [dataEdit, setDataEdit] = useState(false);
  const [sessionData, setSessionData] = useState(false);
  const [image, setImage] = useState(null);


  const navigate = useNavigate();  
  const {id} = useParams();

  useEffect (() => {

    const token = localStorage.getItem('token');

    if (token) {
      const tokenPayload = token.split('.')[1];
      const decodedToken = new TextDecoder().decode(Uint8Array.from(atob(tokenPayload), c => c.charCodeAt(0)));
      const tokenJson = JSON.parse(decodedToken);
      setSessionData(tokenJson);
      
      if (tokenJson && tokenJson.rol == '2') {
        const idProducto = atob(id)
        
        const requestOptions = {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: idProducto})
        } 
        
  
        fetch ('http://localhost:3000/product/profile', requestOptions)
        .then(response => { return response.json(); })
        .then(data => { setProductData(data); })
        .catch(error => { console.error('Error al obtener información:', error); });
      } else {
        console.error('Token de autorización, o sin permisos.');
        navigate('/');        
      }

    } else {
      console.error('Token de autorización no disponible');
      navigate('/');
    }
  }, [id])

  const handleEdit = () => {
    if (dataEdit) {
      if (confirm("¿Quieres volver atrás y perder los cambios?")){
        document.getElementById("name").value = productData.name;
        document.getElementById("description").value = productData.description;
        document.getElementById("stock").value = productData.stock;
        document.getElementById("price").value = productData.price;

        setDataEdit(false);
      }
    } else {
      setDataEdit(true);
    }

  }

  const handleSubmit = (id) => {
    const formData = {
      id: id,
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      stock: document.getElementById("stock").value,
      price: document.getElementById("price").value
    }

    const requestOptions = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    fetch('http://localhost:3000/profile/product/update', requestOptions)    
    .then(response => response.json())
    .then(data => {
      alert("La información fue actualizada correctamente.");
      location.reload();
    })
    .catch(error => console.error('Error al actualizar información:', error));
  }
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  }

  const handleImageUpload = (idProducto) => {
    if (image) {
      const formData = new FormData();
      formData.append("id", idProducto); 
      formData.append("path", './public/img/productos/');
      formData.append("image", image);
  
      fetch('http://localhost:3000/upload/image/product', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log('Imagen subida correctamente:', data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error al subir imagen:', error);
      });
    } else {
      console.error('No se ha seleccionado ninguna imagen');
    }
  };

  
  return (
    <>
      <div className="w-full sm:w-10/12 lg:w-7/12 my-5">
        <span className="w-full flex justify-between items-center px-4 sm:px-10">
          <h1 className="font-bold text-2xl ">PERFIL DEL PRODUCTO:</h1>        
          <Link to="/list/products">
            <i className="fa-solid fa-angle-left size-[35px] border border-black rounded-full justify-center items-center flex text-xl cursor-pointer duration-300 hover:bg-black/[0.3]"></i>
          </Link>  
        </span>
        <div className="flex flex-col sm:flex-row justify-between gap-5">
          {productData ? (
            <>
              <div className="bg-white shadow-lg w-full sm:w-7/12 p-4 sm:p-10 rounded-[15px] my-3">
                <form className="flex flex-col gap-4">
                  <div className="w-full">
                    <label htmlFor="name" className="font-bold uppercase text-md">Nombre:</label>
                    <input type="text" id="name" className="border mt-1 px-2 p-1 rounded-md w-full" defaultValue={productData.name} disabled={!dataEdit} />
                  </div>
                  <div className="w-full flex justify-between gap-3">
                    <div className="w-6/12 pr-3"> 
                      <label htmlFor="stock" className="font-bold uppercase text-md">Stock:</label>
                      <input type="number" id="stock" className="border px-2 p-1 rounded-md w-full" defaultValue={productData.stock} disabled={!dataEdit} />
                    </div>
                    <div className="w-6/12 pl-3"> 
                      <label htmlFor="price" className="font-bold uppercase text-md">Precio:</label>
                      <input type="number" id="price" className="border px-2 p-1 rounded-md w-full" defaultValue={productData.price} disabled={!dataEdit} />
                    </div>
                  </div>
                  <div className="w-full"> 
                    <label htmlFor="description" className="font-bold uppercase text-md">Descripción:</label>
                    <textarea id="description" className="border px-2 p-1 rounded-md w-full resize-none	h-28" defaultValue={productData.description} disabled={!dataEdit} />
                  </div>
                </form>
                <div className="flex pt-10 gap-3 justify-between">
                  <div className="flex gap-3">
                    <button onClick={handleEdit} className="px-3 p-1 rounded-lg bg-orange-400 font-bold text-white border-2 border-orange-400 hover:bg-orange-500 duration-300">
                      {dataEdit ? 'Cancelar' : 'Editar'}
                    </button>
                    {dataEdit && (
                      <button onClick={() => {handleSubmit(productData.id)}} className="px-3 p-1 rounded-lg bg-orange-400 font-bold text-white">Guardar</button>
                    )}
                  </div>
                </div>
              </div> 
              <div className="bg-white shadow-lg w-full sm:w-5/12 p-4 sm:p-10 rounded-[15px] my-3">
                <form>
                  <h1 className="font-bold uppercase text-md">IMAGEN:</h1>
                  <div className="flex justify-center py-5 my-4 h-60 overflow-hidden border-y-2 border-orange-400">
                    <img src={productData.img} alt="foto-producto" className="max-h-full"/>
                  </div>
                  <input type="file" id="image" accept="image/*" onChange={handleImageChange}/>
                </form>
                {(image != null) && 
                  <button onClick={() => handleImageUpload(productData.id)} className=" mt-5 px-3 p-1 rounded-lg bg-orange-400 font-bold text-white">Guardar</button>
                }
              </div>  
            </>            
          ):(
            <h1>cargando...</h1>
          )}        
        </div>           
      </div>
    </>
  );
}

export { ProductProfile };
