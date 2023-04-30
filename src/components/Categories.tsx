import React from "react";

const categories: string[] = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
}

const Categories:React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
 }

 export default Categories