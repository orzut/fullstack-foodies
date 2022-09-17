const createLineItems = (numberOfLineItemsPerOrder, dishes, orders) => {
    const lineItems = [];
    for (let i = 0;i < orders.length; i++) {
        // Generate an array of random unique numbers
        const numbers = Array(100).fill().map((_, index) => index + 1);
        numbers.sort(() => Math.random() - 0.5).slice(0,numberOfLineItemsPerOrder);
        for (let idx of numbers) {
            lineItems.push({
                orderId: orders[i].id,
                quantity: Math.ceil(Math.random()*10),
                dishId: dishes[idx].id
            })
        }
    };
    return lineItems;
};

module.exports = createLineItems;