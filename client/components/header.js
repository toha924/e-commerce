import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setBase, sortProducts } from '../redux/reducers/products'

const Header = () => {
  const dispatch = useDispatch()
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)

  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const getPrice = (id) => list.find((it) => it.id === id).price
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)
  const sum = Object.entries(selection).reduce(
    (acc, [id, qty]) => acc + getPrice(id) * qty * (rates[base] || 1),
    0
  )
  function sortByPrice() {
    list.sort((a, b) => {
      const priceA = a.price
      const priceB = b.price
      if (priceA > priceB) return -1
      if (priceA < priceB) return 1
      return 0
    })
    dispatch(sortProducts([...list]))
  }
  function sortByName() {
    list.sort((a, b) => {
      const nameA = a.title.toUpperCase()
      const nameB = b.title.toUpperCase()
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0
    })
    dispatch(sortProducts([...list]))
  }

  return (
    <div>
      <nav className="flex flex-row flex-end  p-1">
        <div className="logo font-sans-roboto mr-3 self-start">
          <Link id="brand-name" to="/">
            {' '}
            COLOR-BOX Shop
          </Link>
        </div>
        <div>
          {['CAD', 'USD', 'EUR'].map((it) => {
            return (
              <button
                key={it}
                type="button"
                className={`mx-4 ${base === it ? 'underline' : ''}`}
                onClick={() => {
                  dispatch(setBase(it))
                }}
              >
                {it}
              </button>
            )
          })}
        </div>
        <div>
          <button type="button" onClick={sortByName}>
            Sort A-Z
          </button>{' '}
          <button type="button" onClick={sortByPrice}>
            Sort by price
          </button>{' '}
        </div>
        <div className="px-1">{sum !== 0 && !Number.isNaN(sum) && sum}</div>
        <div className="px-1" id="order-count">
          {numberOfItems !== 0 && !Number.isNaN(numberOfItems) && numberOfItems}
        </div>
        <div className="flex flex-row">
          <Link className="px-1" to="/">
            Go Shopping
          </Link>
          <Link className="px-1 " to="/cart">
            Shopping cart
          </Link>
        </div>
      </nav>
    </div>
  )
}

Header.propTypes = {}

export default React.memo(Header)
