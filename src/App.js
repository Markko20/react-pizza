import React from 'react'
import './scss/app.scss'
import Header from './components/Header';
import axios from 'axios';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart';
import NotFound from './components/NotFound';

function App() {
  const [pizzas, setPizzas] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData(){
      const pizzasList = await axios.get('http://localhost:5004/pizzas')

      setPizzas(pizzasList.data)

      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="wrapper">
      <Header />

      <Routes>
        <Route path="/" element={<Home pizzas={pizzas} isLoading={isLoading} />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
