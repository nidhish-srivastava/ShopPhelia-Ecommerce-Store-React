import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useArrayGlobalhook } from '../context/context'

function Single() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [dataObject, setDataObject] = useState({})
  const { cartItems, addToCart, removeFromCart } = useArrayGlobalhook()

  const getSingleData = async () => {
    setLoading(true)
    const response = await axios.get(`https://dummyjson.com/products/${id}`)
    console.log(response.data)
    setDataObject(response.data)
    setLoading(false)
  }
  useEffect(() => {
    getSingleData()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <React.Fragment>
      <main className='singleMovieContainer'>
        <div className='left'>
          <h2>{dataObject.title}</h2>
          <img src={dataObject?.images?.[2]} className='img' />
        </div>
        <div className='right'>
          <h2>Director : {dataObject.price}</h2>
          <h2>Writer : {dataObject.brand}</h2>
          <h2>Discount : {dataObject.discountPercentage}</h2>
          <p>{dataObject.description}</p>
        </div>
        <div className='centered'>
                    {cartItems[id] === 0 ? <button onClick={()=>addToCart(id)} className='ADD-main-btn' >Add to Cart</button> :(
                        <div  className='cart-add-container'>
                    <button className='add-cart-btn' onClick={()=>addToCart(id)}>+</button>
                    <span style={{fontSize:'1.3rem'}}>{cartItems[id] > 0 && cartItems[id]}</span>
                    <button className='add-cart-btn' onClick={()=>removeFromCart(id)}>-</button>
                    </div>
                    ) }
                 </div>
        <Link to='/' className='goBackLink'>Go Back</Link>
      </main>
    </React.Fragment>
  )
}

export default Single