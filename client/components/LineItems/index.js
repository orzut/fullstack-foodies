import React from 'react';

function LineItems({selectedOrder}) {
    if (selectedOrder) {
        return (
            <ul>
                {selectedOrder.lineItems.map(lineItem => {
                    return (
                        <li key={lineItem.id}>{lineItem.id} {lineItem.quantity}</li>
                    )
                })}
            </ul>
        )
    } else {
        return null
    }
};

export default LineItems;