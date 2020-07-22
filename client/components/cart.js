import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSelection, removeSelection } from '../redux/reducers/products'

const Cart = () => {
  const dispatch = useDispatch()

  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const getPrice = (id) => list.find((it) => it.id === id).price
  const sum = Object.entries(selection).reduce(
    (acc, [id, qty]) => acc + getPrice(id) * qty * (rates[base] || 1),
    0
  )
  const symbols = {
    USD: '$',
    EUR: 'E',
    CAD: 'C'
  }
  const listSelected = list.reduce((acc, rec) => {
    const keys = Object.keys(selection)
    if (keys.indexOf(rec.id) > -1) {
      // rec.order = selection[rec.id]
      return [...acc, rec]
    }
    return acc
  }, [])

  return (
    <div>
      {listSelected.map((card) => {
        return (
          <div className="border-2 border-solid border-black m-4 p-1" key={card.id}>
            <img src={card.image} alt={card.title} className=" inline h-20" />
            <span>{card.title}</span>
            <span>
              {(card.price * (rates[base] || 1)).toFixed(2)} {symbols[base]}{' '}
            </span>

            <button
              type="button"
              onClick={() => {
                dispatch(removeSelection(card.id))
              }}
            >
              -
            </button>

            <span> {selection[card.id] || 0}</span>
            <button
              type="button"
              onClick={() => {
                dispatch(addSelection(card.id))
              }}
            >
              +
            </button>
            <span>
              {(card.price * (rates[base] || 1)).toFixed(2) * (selection[card.id] || 0)}
              {symbols[base]}
            </span>
          </div>
        )
      })}
      <div id="total-amount">
        `Total: {sum.toFixed(2)}
        {symbols[base]}.`
      </div>
    </div>
  )
}

Cart.propTypes = {}

export default React.memo(Cart)
