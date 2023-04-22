import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import React, { useContext } from 'react'
import axios from 'axios';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import { searchContext } from '../App';

function Home() {
  const {searchValue} = useContext(searchContext)
  const dispatch = useDispatch()
  const [pizzas, setPizzas] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentPage, setCurrentPage] = React.useState(1)
  const categoryId = useSelector((state) => state.filterSlice.categoryId)
  const sort = useSelector(state => state.filterSlice.sort.sortProperty)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const items = pizzas
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }

      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />)

  React.useEffect(() => {
    window.scrollTo(0, 0)
    const order = sort.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    

    async function fetchData(){
      setIsLoading(true);

      const pizzasList = await axios.get(
        `https://643da3786c30feced8172a1b.mockapi.io/pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}`
      );

      setPizzas(pizzasList.data)

      setIsLoading(false)
    }

    fetchData()
  }, [categoryId, sort, currentPage])

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : items}</div>
        <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
    </div>
  );
}

export default Home