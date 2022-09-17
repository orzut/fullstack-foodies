const createOrders = (numberOfOrdersPerUser, users) => {
    const orders = [];
    for (let j = 0; j < users.length; j++) {
        let isCart;
        for (let i = 0; i < numberOfOrdersPerUser; i++) {
            isCart = (i < 1);
            orders.push({
                userId: users[i].id,
                isCart
            })
        }
    }
    return orders;
};

module.exports = createOrders;