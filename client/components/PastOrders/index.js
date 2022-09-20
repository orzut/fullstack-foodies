import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store';
function PastOrders() {
    const auth = useSelector(state => state.auth);
    const orders = useSelector(state => state.orders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrders());
    }, [auth.id])

    const handleClick = (ev) => {
        console.log(ev.target.text)
    }

    if (orders[0]) {
        return (
            <div>
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
                            <tr key={order.id}>
                                <td onClick={handleClick}>{order.id}</td>
                                <td>{order.createdAt}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    } else {
        <div>No Past Orders!</div>
    }
};
export default PastOrders;