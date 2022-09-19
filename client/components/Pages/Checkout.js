import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchMenu } from '../../store';
import {fetchCart } from '../../store/cart';
import StripeCart from './StripeCart';

const Checkout = ({ dishes, cart})=> {

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
      <div>
          <div>
              <h1>Check Out</h1>
          </div>
      </div> 
     
        <div>
          <table>
            <thead>
              <tr>
                <th width='75%'>Dishes In Cart</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>

            {dishes.map( dish => {
            const lineItem = cart.lineItems.find(lineItem => lineItem.dishId === dish.id) || { quantity: 0 };
              if (lineItem.quantity > 0){
                return (
                  <tr key={ dish.id }>
                    <td>{dish.name}</td>
                    <td width='20px'>${dish.price}</td>
                    <td>{lineItem.quantity}</td>
                    <td>${Math.round((Number(dish.price) * lineItem.quantity+ Number.EPSILON) * 100) / 100}</td>
                  </tr>
                )
              }})}
              <tr>
                <td colSpan='2'>Grand Total</td>
                <td colSpan='4'>${Math.round(cartTotal * 100) / 100}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
            <Link to='/restaurants'>
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
              <span>Cancel and Keep Shopping</span>
            </Link>
          </div>

            <div>
              <StripeCart />
            </div>
          </div>
        </div>
  )
}
  
const mapStateToProps = (state)=> {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    exchangeToken: () => dispatch(exchangeToken()),
    fetchCart: () => dispatch(fetchCart()),
    fetchMenu: () => dispatch(fetchMenu()),
    dispatchAction: (action)=> dispatch(action)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);