import React from 'react'
import './scss/app.scss'
import Header from './components/Header';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

export const searchContext = React.createContext()

function App() {
  const [searchValue, setSearchValue] = React.useState('')

  return (
    <div className="wrapper">
      <searchContext.Provider value ={{searchValue, setSearchValue}}>
        <Header/>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </searchContext.Provider>
    </div>
  );
}

export default App;
