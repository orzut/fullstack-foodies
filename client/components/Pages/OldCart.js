import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart, fetchCart, clearCart } from "../../store/cart";
import { addSavedOrders, removeSavedOrders } from '../../store/savedOrders';
import { Link } from "react-router-dom";
import CartNameInput from './CartNameInput';
import './Cart.css';

const Cart = connect(
  (state) => state,
  (dispatch) => {
    return {
      addToCart: (dish, diff = 1) => dispatch(addToCart(dish, diff)),
      clearCart: () => dispatch(clearCart()),
      authenticate: () => dispatch(authenticate()),
      fetchCart: () => dispatch(fetchCart()),
      fetchMenu: () => dispatch(fetchMenu()),
      addSavedOrders: (name) => dispatch(addSavedOrders(name)),
      removeSavedOrders: () => dispatch(removeSavedOrders()),
      dispatchAction: (action) => dispatch(action),
    };
  }
)(({ dishes, cart, addToCart, clearCart, fetchCart, addSavedOrders, removeSavedOrders }) => {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isNameInputActive, setIsNameInputActive] = useState(false)

  useEffect(() => {
    async function loadCart() {
      await fetchCart();
    }
    loadCart();
  }, []);

  let cartTotal = 0;
  cart.lineItems.forEach((lineItem) => {
    let quantity = lineItem.quantity;
    let price = lineItem.dish.price;
    if (quantity && price) {
      let lineItemCost = price * quantity;
      cartTotal = lineItemCost + cartTotal;
    }
  });

  const addToFavorite = () => {
    if (!isFavorited) {
      setIsFavorited(true)
      setIsNameInputActive(true)
      // addSavedOrders(cartName)
    } else {
      setIsFavorited(false)
      removeSavedOrders()
    }
  }

  return (
    <div>
    <div className={isNameInputActive? 'blur-background':''}></div>
    <div className="breadcrumb-section breadcrumb-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<p>Get ready for delicious!</p>
						<h1>Cart</h1>
					</div>
				</div>
			</div>
		</div>
	</div>

    <div className='cart-container'>
      <div>
        <div>
      {cart.lineItems.length === 0 ? (
        <div className='cart-empty'>
          <p>Your cart is currently empty.</p>
          <div className='start-shopping'>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              <span>Add some food to your cart!</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className='cart-name-input-wrapper'>
            <div className={`cart-name-input-container ${isNameInputActive? 'active' : ''}`}>
              <CartNameInput setIsNameInputActive={setIsNameInputActive} setIsFavorited={setIsFavorited}/>
            </div>
          </div>
          <ul style={{ listStyleType: "none" }}>
            {dishes.map((dish) => {
              const lineItem = cart.lineItems.find(
                (lineItem) => lineItem.dishId === dish.id
              ) || { quantity: 0 };

              if (lineItem.quantity > 0) {
                return (
                  <li className='cart-product' key={dish.id}>
                    <h3>{dish.name}</h3>
                    Quantity: {lineItem.quantity}
                    <br></br>
                    ${dish.price}
                    <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                    onClick={() => addToCart(dish)}>
                      Add Quantity
                    </button>
                    <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                      disabled={lineItem.quantity === 0}
                      onClick={() => addToCart(dish, -1)}
                    >
                      Delete Quantity
                    </button>
                    <div className='cart-product-total-price'>
                      Dish Total: $
                      {Math.round(
                        (Number(dish.price) * lineItem.quantity +
                          Number.EPSILON) *
                          100
                      ) / 100}
                    </div>
                    <hr></hr>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}
      <div className='cart-summary'>
        <div className='cart-summary-buttons'>
          <button
            className='clear-cart'
            onClick={() => clearCart()}
          >
            Clear Cart
          </button>
          <button
              className={`favorite-button ${isFavorited?'favorited':''}`}
              onClick={() => {addToFavorite()}}
              disabled={isNameInputActive}
          >
            {isFavorited ? 'Favorited' : 'Save'}
          </button>
        </div>
        <div className='cart-checkout'>
          <div className='subtotal'>
            <span>
              Subtotal
            </span>
            <span className='amount'>${Math.round(cartTotal * 100) / 100}</span>
            </div>
            <p>Delivery Fees: Your order qualifies for free delivery!</p>
            <p>Taxes: $ {Math.round(cartTotal * 100 * 0.04) / 100} (Applied at
              checkout)</p>
            <button className="cart-buttons">
              <Link to="/checkout">Checkout</Link>
            </button>
            <div className='cart-empty'>
            <div className='continue-shopping'>
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span className="text-black-200 text-xl font-semibold">
                  Continue Ordering
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
});

const mapStateToProps = (state) => {
  return state;
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     authenticate: () => dispatch(authenticate()),
//     fetchCart: () => dispatch(fetchCart()),
//     fetchMenu: () => dispatch(fetchMenu()),
//     dispatchAction: (action) => dispatch(action),
//   };
// };

export default connect(mapStateToProps)(Cart);
