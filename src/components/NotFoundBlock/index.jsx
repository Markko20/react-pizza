import styles from './NotFoundBlock.module.scss'
import { Link } from 'react-router-dom'

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1 >
        <span>😕</span>
        <br />
        Ничего не найденно
      </h1>
      <Link to='/' className={styles.btn}> Вернуться на главную страницу</Link>
    </div>
  );
}

export default NotFoundBlock