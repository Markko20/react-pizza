import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const FullPizza = () => {
  const { id } = useParams()
  const [pizza, setPizza] = React.useState({})

  React.useEffect(()=> {
    try {
      const fethData = async() => {
        const {data} = await axios.get(`https://643da3786c30feced8172a1b.mockapi.io/pizzas/${id}`);
        setPizza(data)
      }

      fethData()
    } catch (error) {
      alert('Ошибка загрузки пиццы')
      console.error(error)
    }
  }, [])

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum expedita tempora, accusamus quisquam sint, asperiores libero cupiditate nam iure, quasi nostrum animi eius architecto praesentium maiores vitae quis. Quisquam, laboriosam?</p>
      <h4>{pizza.price}</h4>
    </div>
  )
}

export default FullPizza