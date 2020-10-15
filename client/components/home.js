import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Head from './head'
import Header from './header'
import Cards from './cards'
import Cart from './cart'
import Logs from './logs'

import { getProducts } from '../redux/reducers/products'

// import wave from '../assets/images/wave.jpg'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div>
      <Head title="Hello" />
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Cards />} />
        <Route exact path="/cart" component={() => <Cart />} />
        <Route exact path="/logs" component={() => <Logs />} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default Home
