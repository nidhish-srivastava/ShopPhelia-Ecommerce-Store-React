import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useArrayGlobalhook } from "../context/context";

function Home() {
  const {
    allData,
    setAllData,
    filteredAllData,
    searchInput,
    cartItems,
    addToCart,
    removeFromCart,
  } = useArrayGlobalhook();

  const getAllData = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products?limit=100"
      );
      console.log("Get All Data", response.data);
      setAllData(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <React.Fragment>
      <h1 className="centered">All Items</h1>
      <div className="category-content">
        {searchInput.length > 1
          ? filteredAllData?.map((currEle, index) => {
              const {
                brand,
                category,
                description,
                discountPercentage,
                id,
                price,
                rating,
                thumbnail,
                title,
                images,
              } = currEle;
              return (
                <div className="category-content-card">
                  <Link className="link" to={`products/${id}`} key={index}>
                    <div>
                      <img src={thumbnail} className="img" />
                    </div>
                    <div className="two">
                      <h3>{title}</h3>
                      <h3>${price}</h3>
                      <div>Brand:{brand}</div>
                    </div>
                  </Link>
                  <div className="cart-add-container">
                    {cartItems[id] === 0 ? (
                      <button
                        onClick={() => addToCart(id)}
                        className="ADD-main-btn"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div>
                        <button
                          className="add-cart-btn"
                          onClick={() => addToCart(id)}
                        >
                          +
                        </button>
                        <span style={{ fontSize: "1.3rem" }}>
                          {cartItems[id] > 0 && cartItems[id]}
                        </span>
                        <button
                          className="add-cart-btn"
                          onClick={() => removeFromCart(id)}
                        >
                          -
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          : allData?.map((currEle, index) => {
              const {
                brand,
                category,
                description,
                discountPercentage,
                id,
                price,
                rating,
                thumbnail,
                title,
                images,
              } = currEle;
              return (
                <div key={index} className="category-content-card">
                  <Link className="link" to={`products/${id}`}>
                    <div>
                      <img src={thumbnail} className="img" />
                    </div>
                    <div className="two">
                      <h3>{title}</h3>
                      <h3>${price}</h3>
                      <div>Brand:{brand}</div>
                    </div>
                  </Link>

                  <div className="cart-add-container">
                    {cartItems[id] === 0 ? (
                      <button
                        onClick={() => addToCart(id)}
                        className="ADD-main-btn"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="cart-add-container">
                        <button
                          className="add-cart-btn"
                          onClick={() => addToCart(id)}
                        >
                          +
                        </button>
                        <span style={{ fontSize: "1.3rem" }}>
                          {cartItems[id] > 0 && cartItems[id]}
                        </span>
                        <button
                          className="add-cart-btn"
                          onClick={() => removeFromCart(id)}
                        >
                          -
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
    </React.Fragment>
  );
}

export default Home;
