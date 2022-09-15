const { faker } = require('@faker-js/faker');

const createRestaurants = (numberOfRestaurants) => {
    const restaurants = [];
    for (let i = 0;i < numberOfRestaurants; i++) {
        let name = faker.company.name();  // restaurants need to be unique
        const description = faker.lorem.paragraph();
        const address = faker.address.streetAddress(useFullAddress=true);
        const restaurantArray = restaurants.map(restaurant=>restaurant.name);
        while (restaurantArray.includes(name)) {
            name = faker.company.companyName();
        };
        restaurants.push({
            name,
            description,
            address
        });
    };
    return restaurants;
};

module.exports = createRestaurants;