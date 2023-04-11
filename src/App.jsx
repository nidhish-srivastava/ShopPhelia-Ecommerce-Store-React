import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom"
import CategoryContent from './components/CategoryContent'
import Home from './components/Home'
import Single from './components/Single'
import Header from './components/Header'
import Cart from './components/Cart'

function App() {
 
  
  return (
    <Router>
      <Header/>      
      <Routes>
      <Route exact path='/category/:id' element={<CategoryContent/>} />
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/products/:id' element={<Single/>} />
      <Route exact path='/cart' element={<Cart/>} />
      </Routes>
    </Router>
  )
}

export default App