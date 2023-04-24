import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useArrayGlobalhook } from '../context/context'
import AllCategories from './AllCategories'

function Header() {
  const [state,setState] = useState(false)
        
        const {searchInput,setSearchInput ,allData,setAllData,setFilteredAllData,totalCartItemsHandler} = useArrayGlobalhook()
  

  const toggleHandler = () =>{
    setState((e)=>{
      return !e
    })
  }

  //* We are searching in array,it first convcerts it into object,then again makes it an array using join method
  const searchHandler = (input) =>{
        setSearchInput(input)
        console.log(searchInput)
        const final = allData.filter((item)=>{
          // * Object.values is used to get an array of object's values
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())  //* join method to convert array to string
        })
        console.log(final)
        setFilteredAllData(final)
  }


  
  return (
    <React.Fragment>
          <header className='headerContainer'>
        <Link className='link' to='/'>
        <h1 className='logo'>
      ShopPhelia
      </h1>
      <span className='home-btn'>
      <i class="fa fa-home"></i>
      </span>
        </Link>
        <div className='searchContainer'>
            <input type="search" className='searchBar' value={searchInput} onChange={(e)=>searchHandler(e.target.value)} />
            <span className='search-icon'>
        <i className="fas fa-search"></i>
            </span>
        </div>
        <Link to={`/cart`}>
        <span className='cart-icon'>
        <i class="fas fa-shopping-cart">
        </i>
        <span className='cart-item-quantity' >
        {totalCartItemsHandler()>0 && totalCartItemsHandler()}
        </span>
        </span>
        </Link>
      <label className='category-label' onClick={toggleHandler}>Choose Category</label>
        </header>
        {state && <AllCategories/>}
          
    </React.Fragment>
  )
}

export default Header
