import {React, useState, useEffect} from 'react'
import { Route, Routes, useNavigate, useLocation, Link } from 'react-router-dom';
import { UsersList } from './components/users-list';
import { ProductsList } from './components/products-list';

function Tables() {
  const [isUserSelected, setUserSelected] = useState(true);
  const [sessionData, setSessionData] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = token.split('.')[1];
      const decodedToken = JSON.parse(atob(tokenPayload));
      setSessionData(decodedToken);

      if (decodedToken.rol !== 2) { 
        navigate('/');
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (location.pathname === "/list/users") {
      setUserSelected(true);
    } else if (location.pathname === "/list/products") {
      setUserSelected(false);      
    }
  }, [location.pathname]);

  const handleChangeInput = (event) => {
    const optionChosen = event.target.value;

    switch (optionChosen) {
      case 'users':
        navigate('/list/users')
        break;
      
      case 'products':
        navigate('/list/products')
        break;
    }

  }

  return (
    <>
      <main className='bg-orange-500/75 w-full min-h-screen flex justify-center items-center'>
        <div className='w-full md:w-10/12 my-10'>
          <div className='w-full bg-black text-white px-4 py-2 rounded-t-lg flex justify-between items-center'>
            <h1 className='text-lg font-bold uppercase'>Lista de {isUserSelected ? 'usuarios' : 'productos'}: </h1>
            <Link to="/profile/user" className='border-2 border-white rounded-full size-[30px] flex items-center justify-center duration-300 hover:bg-white/[0.3]'> <i className="fa-solid fa-angle-left"></i> </Link>
          </div>
          <div className='w-full bg-white p-5 rounded-b-lg flex flex-col justify-center items-center gap-7'>
            <select className='w-full md:w-10/12 mx-auto px-2 py-1 border border-gray-500 rounded-md' value={isUserSelected ? 'users' : 'products'} onChange={handleChangeInput}>
              <option value="users">Usuarios</option>
              <option value="products">Productos</option>
            </select>
            <span className='h-[2px] w-10/12 rounded-full bg-black/[0.7]'></span>
            <Routes>
              <Route path="/users" element={<UsersList />} />
              <Route path="/products" element={<ProductsList />} />
            </Routes>
          </div>
        </div>
      </main>
    </>
  )
}

export default Tables;