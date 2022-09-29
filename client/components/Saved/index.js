import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import RestaurantCard from "../Pages/RestaurantCard";
import {fetchSavedRestaurants, fetchSavedOrders, addToCart} from "../../store";

const Saved = () => {
    const savedRestaurants = useSelector(state => state.savedRestaurants)
    const savedOrders = useSelector(state => state.savedOrders)
    const savedRestaurantsId = savedRestaurants.map(restaurant => restaurant.restaurantId)
    const savedOrdersId = savedOrders.map(order => order.orderId)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [selectedOrder, setSelectedOrder] = useState();
    const [isLineItemsActive, setIsLineItemsActive] = useState(false);
    const [orderTotals, setOrdersTotal] = useState([]);

    useEffect(() => {
        if (auth.id) {
            dispatch(fetchSavedRestaurants())
            dispatch(fetchSavedOrders())
        }
    },[auth.id,savedRestaurantsId.length,savedOrdersId.length])

    // useEffect(()=>{
    //     if (savedOrders[0]) {
    //         const computeOrderTotals = savedOrders.map((savedOrder) => {
    //             return (
    //                 savedOrder.order.lineItems.reduce((acc, curr) => {
    //                     acc += parseFloat(curr.dish.price) * parseFloat(curr.quantity)
    //                     return acc
    //                 }, 0)
    //             )
    //         });
    //         setOrdersTotal(computeOrderTotals)
    //     }
    // }, [savedOrders.length,auth.id,orderTotals.length])

    const handleClick = (ev) => {
        const orderId = ev.target.dataset.action;
        setSelectedOrder(savedOrders.find(order => order.id === orderId));
        setIsLineItemsActive(true);
    }

    const handleAdd = (ev) => {
        const orderId = ev.target.dataset.action;
        const selectedSavedOrder = savedOrders.find(order => order.id === orderId)
        selectedSavedOrder.order.lineItems.map(lineItem => {
            dispatch(addToCart(lineItem.dish, lineItem.quantity))
        })
        alert('Added items to cart!')
    }

    return (
        <main>
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <p>Fresh and Tasty</p>
                                <h1>Your Favorite Stuff</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1>Favorite Restaurants ({savedRestaurants.length})</h1>
            </div>
            {/* Restaurant Listing Begins Here*/}
            <div className="flex flex-wrap justify-around">
                {savedRestaurants.map((savedRestaurant) => {
                    if (savedRestaurantsId.includes(savedRestaurant.restaurantId)) {
                        return <RestaurantCard key={savedRestaurant.id}
                                               restaurant={savedRestaurant.restaurant}
                                               liked={true}/>
                    } else {
                        return <RestaurantCard key={savedRestaurant.restaurantId}
                                               restaurant={savedRestaurant.restaurant}
                                               liked={false}/>
                    }
                })}
            </div>
            <hr />
            <div>
                <h1>Favorite Orders ({savedOrders.length})</h1>
            </div>
            {/* Orders Listing Begins Here*/}
            <div className='past-orders-wrapper'>
                <div className='past-orders-container'>
                    <div className={'text-xl font-bold'}>Saved Orders</div>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created At</th>
                            {/*<th>Total</th>*/}
                            <th>Add to Cart</th>
                        </tr>
                        </thead>
                        <tbody>
                        {savedOrders.map((order, idx) => {
                            return (
                                <tr key={order.id} className='order-id'>
                                    <td data-action={order.id} onClick={handleClick}>{order.id}</td>
                                    <td data-action={order.id} onClick={handleClick}>{order.createdAt}</td>
                                    {/*<td data-action={order.id} onClick={handleClick}>{orderTotals[idx]}</td>*/}
                                    <td data-action={order.id} className='text-center' onClick={handleAdd}>+</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    );
};

export default Saved;
