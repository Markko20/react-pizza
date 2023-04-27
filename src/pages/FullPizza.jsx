import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem, selectCartItemById } from "../redux/slices/cartSlice";

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState({});
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const typeNames = ["Тонкое", "Традиционное"]
  const cartitem = useSelector(selectCartItemById(id));
  const dispatch = useDispatch()

  const onClickAdd = () => {
    const item = {
      id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeType],
      size: pizza.sizes[activeSize],
    };
    dispatch(addItem(item));
  };;

  React.useEffect(() => {
    try {
      const fethData = async () => {
        const { data } = await axios.get(
          `https://643da3786c30feced8172a1b.mockapi.io/pizzas/${id}`
        );
        setPizza(data);
      };

      fethData();
    } catch (error) {
      alert("Ошибка загрузки пиццы");
      console.error(error);
    }
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className="container">
      <div className="fullPizza-wrapper">
        <img className="fullPizza-img" src={pizza.imageUrl} alt="" />
        <div className="fullPizza-info">
          <h2 className="fullPizza-title">{pizza.title}</h2>
          <p className="fullPizza-subtitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            expedita tempora, accusamus quisquam sint, asperiores libero
            cupiditate nam iure, quasi nostrum animi eius architecto praesentium
            maiores vitae quis. Quisquam, laboriosam?
          </p>

          {pizza.types && (
            <div className="pizza-block__selector fullPizza-block__selector">
              <ul>
                {pizza.types.map((type) => (
                  <li
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={activeType === type ? "active" : ""}
                  >
                    {typeNames[type]}
                  </li>
                ))}
              </ul>
              <ul>
                {pizza.sizes.map((size, i) => (
                  <li
                    key={i}
                    onClick={() => setActiveSize(i)}
                    className={activeSize === i ? "active" : ""}
                  >
                    {size} см.
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h4 className="fullpizza-price">{pizza.price}₽</h4>

          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {(cartitem ? cartitem.count : 0) > 0 && <i>{cartitem.count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
