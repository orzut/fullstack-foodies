import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store';
import LineItems from '../LineItems';
import Pagination from '../Pagination';
import './PastOrders.css';

function PastOrders() {
    const [selectedOrder, setSelectedOrder] = useState();
    const [isLineItemsActive, setIsLineItemsActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [orderTotals, setOrdersTotal] = useState([]);
    const auth = useSelector(state => state.auth);
    const orders = useSelector(state => state.orders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrders());
    }, [auth.id])

    useEffect(()=>{
        const computeOrderTotals = orders.map((order) => {
            return (
                order.lineItems.reduce((acc,curr)=>{
                    acc += parseFloat(curr.dish.price)*parseFloat(curr.quantity)
                    return acc
                }, 0)
            )
        });
        setOrdersTotal(computeOrderTotals)
        console.log(computeOrderTotals)
    }, [orders.length,auth.id])
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentOrders = orders.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(orders.length / recordsPerPage)

    const handleClick = (ev) => {
        const orderId = ev.target.dataset.action;
        setSelectedOrder(orders.find(order => order.id === orderId));
        setIsLineItemsActive(true);
    }


    return ((orders.length>0)?
        (<div className='past-orders-wrapper'>
            <div className='past-orders-container'>
                <div className={'text-xl font-bold'}>Past Orders</div>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Created At</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentOrders.map((order, idx) => {
                        return (
                            <tr key={order.id} onClick={handleClick} className='order-id'>
                                <td data-action={order.id}>{order.id}</td>
                                <td data-action={order.id}>{order.createdAt}</td>
                                <td data-action={order.id}>{orderTotals[idx]?orderTotals[idx].toFixed(2):null}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <div className='pagination-container'>
                    <Pagination
                        nPages = { nPages }
                        currentPage = { currentPage }
                        setCurrentPage = { setCurrentPage }
                    />
                </div>
            </div>
            <div className={`line-items-container ${isLineItemsActive?'active':''}`}>
                <LineItems selectedOrder={selectedOrder} setIsLineItemsActive={setIsLineItemsActive}/>
            </div>
        </div>):(
            <div>No Past Orders!</div>
        )
    )
};
export default PastOrders;