import React, { useEffect, useState } from 'react'
import { useArrayGlobalhook } from '../context/context'

function Cart() {
    const {cartItems,allData,addToCart,removeFromCart,getTotalCartAmount,deleteItem} = useArrayGlobalhook()

   
  return (
    <div className='cart-main-container'>
        {allData?.map((currEle,index)=>{
    const {id,title,price,thumbnail} = currEle
               if(cartItems[currEle.id]!==0){   //* Fundamental logic,meaning that if item is added,its id is greateer than 0,otherwise it wont be here in the cart section
            return(
                <div className='cart-card'>
                  <div>
                    <img src={thumbnail} alt="" />
                  </div>
                 <div className='right2'>
                    <h3>{title}</h3>
                    <h3>₹{price}</h3>
                    <div className='cart-add-container'>
                    <button className='add-cart-btn' onClick={()=>addToCart(id)}>+</button>
                    <span style={{fontSize:'1.3rem'}}>{cartItems[id] > 0 && cartItems[id]}</span>
                    <button className='add-cart-btn' onClick={()=>removeFromCart(id)}>-</button>
                    </div>
                 </div> 
                 <span className="delete-icon" onClick={()=>deleteItem(currEle.id)} >
                 <i className='fa fa-trash'></i>
                 </span>
                </div>

            )
               }
        })
        
        }
<button className='bill'>Total Bill :₹{getTotalCartAmount()}</button>
    </div>
  )
}

export default Cart