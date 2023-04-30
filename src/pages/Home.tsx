import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import React from 'react'
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home:React.FC = () => {
  const dispatch = useAppDispatch()
  const {categoryId, currentPage, searchValue} = useSelector((state: RootState) => state.filterSlice)
  const sort = useSelector((state: any) => state.filterSlice.sort.sortProperty)
  const pizzas = useSelector((state: any) => state.pizza.items)
  const status = useSelector((state: any) => state.pizza.status)

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const items = pizzas
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }

      return false;
    })
    .map((obj: any) => (
        <PizzaBlock key={obj.id} {...obj} />
    ));

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />)

  React.useEffect(() => {
    const order = sort.includes('-') ? 'asc' : 'desc'
    const sortBy: string = sort.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    
    async function fetchData(){
      
      dispatch(
        fetchPizzas({
          order,
          sortBy,
          category,
          currentPage: String(currentPage)
        }),
      );

    }

    fetchData()
    window.scrollTo(0, 0)
    // eslint-disable-next-line
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
              Произошла ошибка 😕
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