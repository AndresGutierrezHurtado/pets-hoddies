import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { UserProfile } from './components/userProfile';
import { ProductProfile } from './components/productProfile.jsx';

function Profile() {
  return ( 
    <main className='bg-orange-500/75 w-full min-h-screen flex justify-center items-center'>
      <Routes>
        <Route path="/user" element={<UserProfile />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/product/:id" element={<ProductProfile />} />
      </Routes>   
    </main>
  );
}

export default Profile;
