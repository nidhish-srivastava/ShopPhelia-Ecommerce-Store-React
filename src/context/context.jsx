import React,{useContext, useState} from 'react'

 const ArrayContext = React.createContext()

export const useArrayGlobalhook = () =>{
    return useContext(ArrayContext)
}

let getDefault = () =>{
    let cart = {}
    for(let i=0;i<101;i++){
        cart[i] = 0
    }
    return cart
}

export const ArrayContextProvider = ({children}) =>{
    const [allData,setAllData] = useState([])
    const [data,setData] = useState([])
    const [dataDetail,setDataDetail] = useState([])
    const [filteredAllData,setFilteredAllData] = useState([])
    const [searchInput,setSearchInput] = useState("")
    const [cartItems,setCartItems] = useState(getDefault())   //* saare object properties ki value 0

    console.log("cart items object",cartItems);
const totalCartItemsHandler = () =>{
    const values = Object.values(cartItems)
    const sum = values.reduce((accumulator,value)=>{
        return accumulator+value
    },0)
    return sum
}
// console.log(totalCartItemsHandler());

    //* we will pass id as input in jsx,we are dynamically increasing the id number when we click on add
    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0
        //* First we will loop through each cart item,check if their value isnt 0,this means they are added in the cart
    
        for(const item in cartItems){  //* Looping though object
            if(cartItems[item]>0){
                let itemInfo = allData.find((product)=>product.id===Number(item)) //* id product ki humaare item ke equal honi chahiye,coz woh bhi id represent kr rha
                if(itemInfo){ //* NOTE  --> THIS LOGIC IS BY ME AND IS INSANE,if not  used,it will show undefined,coz item aint there,how will use find some
                    totalAmount += cartItems[item]*itemInfo.price  //* That item*price  , itemInfo is the required array which has the products added to the cart
                }
            }
        }  
          return totalAmount
    } 
    
    const deleteItem = (id) =>{
    //     console.log(id)   THIS IS JUST FOR TESTING 
    //    const wholeArray =  Object.entries(cartItems)
    //    console.log("whole array",wholeArray)
    //    const filteredArray = wholeArray[id]
    //    console.log(filteredArray)
    //    if(filteredArray[0]==id){
    //     console.log(true) 
    //    }
 
       const updatedItems = allData.filter((item,i)=>i+1!==id)
       setAllData(updatedItems)
       console.log(updatedItems)

    //* NEW PROBLEM,WHEN WE NAVIGATE BACK,I WANT THAT NUMBER OF ITEMS ADDED,SHUD NOW AGAIN BE ZERO

    setCartItems((prev)=>({...prev,[id]:0}))  //* I am setting it 0


 
       

       

       
    }

   

    
 

    const final = {
        data,
        dataDetail,
        setData,
        setDataDetail,
        allData,
        setAllData,
        filteredAllData,
        setFilteredAllData,
        searchInput,
        setSearchInput,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        deleteItem,
        totalCartItemsHandler
    }

    return(
      <ArrayContext.Provider value={final}>
            {children}
        </ArrayContext.Provider>
    )
}



