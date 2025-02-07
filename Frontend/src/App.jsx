
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivateCom from './Components/PrivateCom';
import Login from './Components/Login';
import Addproduct from './Components/Addproduct';
import ProdList from './Components/ProdList';
import UpdateProd from './Components/UpdateProd';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Define your routes here */}
        <Route element={<div><PrivateCom/></div>} >
        <Route path="/" element={<div><ProdList/></div>} />
        <Route path="/add" element={<Addproduct/>} />
        <Route path="/update/:id" element={<UpdateProd/>} />
        <Route path="/logout" element={<div>Logout Page</div>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        </Route>
        <Route path="/signUp" element={<div><SignUp/></div>} />
        <Route path="/login" element={<div><Login/></div>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
