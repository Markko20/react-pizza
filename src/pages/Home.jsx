import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import React from 'react'
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

function Home() {
  const dispatch = useDispatch()
  const {categoryId, currentPage, searchValue} = useSelector(state => state.filterSlice)
  const sort = useSelector(state => state.filterSlice.sort.sortProperty)
  const pizzas = useSelector(state => state.pizza.items)
  const status = useSelector(state => state.pizza.status)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
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
    const order = sort.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    
    async function fetchData(){
      
      dispatch(
        fetchPizzas({
          order,
          sortBy,
          category,
          currentPage
        }),
      );

    }

    fetchData()
    window.scrollTo(0, 0)
  }, [categoryId, sort, currentPage])

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
          <div className='content__error-info'>
            <h2>
              Произошла ошибка <icon>😕</icon>
            </h2>
            <p>
              К сожалению, не удалось загрузить пиццы. Попробуйте повторить попытку позже
            </p>
          </div>
        ) : (
          <div className="content__items">{status === 'loading' ? skeletons : items}</div>
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </div>
  );
}

export default Home