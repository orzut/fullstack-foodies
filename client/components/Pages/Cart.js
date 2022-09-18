import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, fetchCart, clearCart } from '../../store/cart';
import { Link } from 'react-router-dom'

const Cart = connect(
  state => state,
  dispatch => {
    return {
      addToCart: (dish, diff = 1)=> dispatch(addToCart(dish, diff)),
      clearCart:() => dispatch(clearCart()),
    };
  }
  
)
(({ dishes, cart, addToCart, clearCart })=> {

  let cartTotal = 0;

  cart.lineItems.forEach(lineItem => {
    let quantity = lineItem.quantity;
    let price = lineItem.dish.price;
    if(quantity && price) {
      let lineItemCost =  price*quantity;
      cartTotal = lineItemCost + cartTotal;
    }
  });

  return (
    <div>
      <div>
          <div className='text-red-400 text-xl font-semibold'>
              <h1>Shopping Cart</h1>
          </div>
      </div>      
      { cart.lineItems.length === 0 ? (
        <div>
          <p className='text-gray-400 text-lg'>Your cart is currently empty.</p>
          <div>
            <Link to='/'>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor" 
              className="bi bi-arrow-left" 
              viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
              <span className='text-black-200 text-xl font-semibold'>Start Ordering</span>
            </Link>
          </div>
        </div>
      ) : (
      <div>
        
        <ul style={{ listStyleType: "none" }}>
        {
          dishes.map( dish => {
            const lineItem = cart.lineItems.find(lineItem => lineItem.dishId === dish.id) || { quantity: 0 };

              if (lineItem.quantity > 0){
                return (
                  <li key={ dish.id }>
                  <h3>{dish.name}</h3>
                  Quantity: {lineItem.quantity}
                  <br></br>
                  ${dish.price}
                    <button onClick={ ()=> addToCart(dish)}>Add Quantity</button>
                    <button disabled={ lineItem.quantity === 0} onClick={ ()=> addToCart(dish, -1)}>Delete Quantity</button>
                  <div className='text-black-200 text-xl font-semibold'>
                    Dish Total: ${Math.round((Number(dish.price) * lineItem.quantity+ Number.EPSILON) * 100) / 100}
                  </div>
                  <hr></hr>
                  </li>
                )
          
              }
            }
          )
        }   
      </ul>
      </div>
      )}
      <div>
        <button className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base' onClick={ () =>clearCart()}>Clear Cart</button>
        <div>
          <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-end justify-evenly px-8 py-2'>
            <span className='text-red-400 text-xl font-semibold'>Subtotal </span>
            <span>
              ${Math.round(cartTotal * 100) / 100}
            </span>
          <p className='text-gray-400 text-lg'>Taxes: $ {(Math.round((cartTotal * 100) * 0.04) / 100)} (Applied at checkout)</p>
          <button className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base'>
              <Link to="/checkout">Checkout</Link>
          </button>
          <div>
            <Link to='/'>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor" 
              className="bi bi-arrow-left" 
              viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
              <span className='text-black-200 text-xl font-semibold'>Continue Ordering</span>
            </Link>
          </div>
        </div>
        </div>
      </div>
      </div>
  );
  }
)
      
      

const mapStateToProps = (state)=> {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    exchangeToken: () => dispatch(exchangeToken()),
    fetchCart: () => dispatch(fetchCart()),
    fetchMenu: ()=> dispatch(fetchMenu()),
    dispatchAction: (action)=> dispatch(action)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);