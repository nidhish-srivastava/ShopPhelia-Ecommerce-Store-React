import React, {useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Loader from './Loader'
import  { useArrayGlobalhook } from '../context/context'


function AllCategories() {
    // const [dataDetail,setDataDetail] = useState([])
    const [state,setState] = useState(true)
    const [loader,setLoader] = useState(false)
    const {setData,data,setDataDetail} = useArrayGlobalhook()

    
    const getCategory = async () =>{
        setState(true)
        try{
            // const response  = await fetch("https://fakestoreapi.com/products")
            const response  = await fetch("https://dummyjson.com/products/categories")
            // console.log(response)
            const data = await response.json()
            setData(data)
            // Once we get the data,stop the loading
            setState(false)
            console.log(data)
        }
        catch(error){
            setState(false)
            console.log(error)
        }
    }

    useEffect(()=>{
        getCategory()   // Since this process is a side one,we are not trigerring by ourself,it shud trigeer itself the moment Mounting happenss
  },[])

  if(state){
    return <Loader/>
}


    const getCategoryData = async (url) =>{
        setLoader(true)
        try {
            const response = await fetch(`https://dummyjson.com/products/category/${url}`)
            const data = await response.json()
            console.log(data.products)
            setDataDetail(data.products)
            setLoader(false)
            
            
        } catch (error) {
            setLoader(false)
            console.log(error)
        }

    }


  return (
    <React.Fragment>

    <div className='category'>
    {data.map((currEle,index)=>{
        return(
            <li key={index}>
               {/* <NavLink activeclassname='.active' to='#'> */}
                <NavLink onClick={()=>getCategoryData(currEle)} to={`/category/${currEle}`} activeclassname='.active'>{currEle}</NavLink>
               {/* </NavLink> */}
            </li>
        )
    })}
    </div>
    
    {/* <h1 className='centered'>Items:</h1> */}
            {loader && <Loader/>}
    </React.Fragment>
  )
}

export default AllCategories