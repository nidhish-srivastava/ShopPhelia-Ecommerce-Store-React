import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { useArrayGlobalhook } from '../context/context'

function CategoryContent() {
    const {dataDetail,setDataDetail,cartItems,addToCart,removeFromCart} = useArrayGlobalhook()
    
    // * SORTING LOW TO HIGH
    const filterLowToHigh =()=>{
           //* .sort method overrides the original array,this means,we are mutating the statewhich we dont want,so we destructure it in a new array
        // const filtered = dataDetail.sort((a,b)=>a.price-b.price) 
           const filtered = [...dataDetail].sort((a,b)=>a.price-b.price) 
           setDataDetail(filtered)
    } 
    //* SORTING HIGH TO LOW
    const filterHighToLow = () =>{
        const filtered = [...dataDetail].sort((a,b)=>b.price-a.price)
        setDataDetail(filtered)
    }

  return (
    <React.Fragment>
        <div className='sortContainer'>
        <button onClick={filterLowToHigh}>Low to High</button>
      <button onClick={filterHighToLow}>High to Low</button>
        </div>
    <div className='category-content'>
        {dataDetail.map((currEle,index)=>{
            const {brand,category,description,discountPercentage,id,price,rating,thumbnail,title,images} = currEle
            return(
                <div key={index} className='category-content-card'>
                    <Link className='link' to={`/products/${id}`}>
                    <div>
                        <img src={thumbnail} className='img' />
                    </div>
                    <div className='two'>
                        <h3>{title}</h3>
                        <h3>${price}</h3>
                        <div>Brand:{brand}</div>
                    </div>
                  </Link>
                    <div>
                    {cartItems[id] === 0 ? <button onClick={()=>addToCart(id)} className='ADD-main-btn' >Add to Cart</button> :(
                        <div  className='cart-add-container'>
                    <button className='add-cart-btn' onClick={()=>addToCart(id)}>+</button>
                    <span style={{fontSize:'1.3rem'}}>{cartItems[id] > 0 && cartItems[id]}</span>
                    <button className='add-cart-btn' onClick={()=>removeFromCart(id)}>-</button>
                    </div>
                    ) }
                 </div>
                </div>
            )
        })}
        </div>
        </React.Fragment>
  )
}

export default CategoryContent

