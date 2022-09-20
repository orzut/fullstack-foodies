import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store';
import LineItems from '../LineItems';
import './PastOrders.css';

function PastOrders() {
    const [selectedOrder, setSelectedOrder] = useState();
    const [isLineItemsActive, setIsLineItemsActive] = useState(false);
    const auth = useSelector(state => state.auth);
    const orders = useSelector(state => state.orders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrders());
    }, [auth.id])

    const handleClick = (ev) => {
        const orderId = ev.target.dataset.action;
        setSelectedOrder(orders.find(order => order.id === orderId));
        setIsLineItemsActive(true);
    }

    if (orders[0]) {
        return (
            <div className='past-orders-wrapper'>
                <div className='past-orders-container'>
                    <div>Past Orders</div>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => {
                            return (
                                <tr key={order.id} onClick={handleClick} className='order-id'>
                                    <td data-action={order.id}>{order.id}</td>
                                    <td data-action={order.id}>{order.createdAt}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className={`line-items-container ${isLineItemsActive?'active':''}`}>
                    <LineItems selectedOrder={selectedOrder}/>
                </div>
            </div>
        )
    } else {
        <div>No Past Orders!</div>
    }
};
export default PastOrders;