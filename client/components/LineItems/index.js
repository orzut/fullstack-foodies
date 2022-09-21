import React, {useState, useEffect} from 'react';
import './LineItems.css';

function LineItems({selectedOrder, setIsLineItemsActive}) {
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        if (selectedOrder) {
            const computeTotalPrice = selectedOrder.lineItems.reduce((acc, curr) => {
                acc += parseFloat(curr.dish.price)*parseFloat(curr.quantity)
                return acc
            }, 0);
            setTotalPrice(computeTotalPrice)
        }
    },[selectedOrder])
    const handleExitClick = (ev) => {
        setIsLineItemsActive(false)
    }
    if (selectedOrder) {
        return (
            <div>
                <ul className='line-items-wrapper'>
                    {selectedOrder.lineItems.map(lineItem => {
                        return (
                            <li key={lineItem.id} className='line-items'>
                                <div className='line-items-left'>
                                    <img src={lineItem.dish.imageUrl}/>
                                    <ul>
                                        <li className='text-xl font-bold'>{lineItem.dish.name}</li>
                                        <li className='text-xs'>{lineItem.dish.description}</li>
                                    </ul>
                                </div>
                                <div className='line-items-right'>
                                    <ul>
                                        <li className='text-xl font-bold'>{`$${lineItem.dish.price}`}</li>
                                        <li>Qty: {lineItem.quantity}</li>
                                        <li className='font-bold'>Subtotal: ${(parseFloat(lineItem.dish.price)*parseFloat(lineItem.quantity)).toFixed(2)}</li>
                                    </ul>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <button className='line-item-exit-button' onClick={handleExitClick}>X</button>
            </div>
        )
    } else {
        return null
    }
};

export default LineItems;