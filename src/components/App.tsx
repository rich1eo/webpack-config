import { useState } from 'react'
import classes from './App.module.scss'
import { Link, Outlet } from 'react-router-dom'

export const App = () => {
  const [count, setCount] = useState(0)

  const increment = () => setCount((prevState) => prevState + 1)
  const decrement = () => setCount((prevState) => prevState - 1)

  return (
    <div className={classes.app} data-testid={'app'}>
      <h1>PLATFORM={__PLATFORM__}</h1>

      <Link to={'/'}>home</Link>
      <Link to={'/about'}>about</Link>
      <Link to={'/shop'}>shop</Link>

      <button onClick={decrement}>-</button>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>

      <Outlet />
    </div>
  )
}
