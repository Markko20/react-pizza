import React from 'react'
import './scss/app.scss'
import Header from './components/Header';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="wrapper">
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
