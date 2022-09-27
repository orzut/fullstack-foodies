const createAddresses = (users) => {
    const addresses = [];
    for (let i=0;i<users.length;i++) {
        addresses.push(
            {apt: '1', street: '510 W 110th St', city: 'New York', state: 'NY', zipcode: '10025', userId:users[i].id}
        )
    }
    return addresses
};

module.exports = createAddresses;