import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSelection, removeSelection, getRates } from '../redux/reducers/products'

const Cards = () => {
  const dispatch = useDispatch()
  const list = [...useSelector((s) => s.products.list)]
  const selection = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const symbols = {
    USD: '$',
    EUR: 'E',
    CAD: 'C'
  }
  useEffect(() => {
    dispatch(getRates())
  }, [])
  return (
    <div className="flex  text-black">
      {list.map((card) => {
        return (
          <div className="flex flex-col items-center card border-2 border-solid border-black w-64 h-64 m-4 p-1" key={card.id}>
            <img src={card.image} alt={card.title} className="card__image object-contain block h-20" />
            <p className="card__title text-center">{card.title}</p>
            <div className="card__price">
              {(card.price * (rates[base] || 1)).toFixed(2)} {symbols[base]}{' '}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="block"
                onClick={() => {
                  dispatch(removeSelection(card.id))
                }}
              >
                -
              </button>

              <span className= "mx-3 block card__product-amount"> {selection[card.id] || 0}</span>
              <button
                type="button"
                className="block"
                onClick={() => {
                  dispatch(addSelection(card.id))
                }}
              >
                +
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

Cards.propTypes = {}

export default React.memo(Cards)
