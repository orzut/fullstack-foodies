const {faker} = require('@faker-js/faker');
const csvToJson = require("convert-csv-to-json");
const fs = require('fs');
const path = require("path");
const { v4 : uuidv4 } = require('uuid');

const createRestaurants = (numberOfRestaurants) => {
    const restaurants = [];
    for (let i = 0; i < numberOfRestaurants; i++) {
        let name = faker.company.name();  // restaurants need to be unique
        const description = faker.lorem.paragraph();
        const address = faker.address.streetAddress(useFullAddress = true);
        const restaurantArray = restaurants.map(restaurant => restaurant.name);
        while (restaurantArray.includes(name)) {
            name = faker.company.companyName();
        }
        ;restaurants.push({
            name, description, address
        });
    };
    return restaurants;
};

const createRestaurantsFromData = () => {
    // const restaurantsData = csvToJson
    //     .fieldDelimiter(";")
    //     .getJsonFromCsv(path.join(__dirname, "..", "..", "..", "public", "restaurants-cleaned-delimiter.csv"));
    //
    // const newRestaurantsData = restaurantsData.map(oldData => ({
    //     ...oldData,
    //     id: uuidv4(),
    //     score: parseFloat(oldData.score),
    //     ratings: parseInt(oldData.ratings),
    //     lat: parseFloat(oldData.lat),
    //     lng: parseFloat(oldData.lng),
    //     imageUrl: ''
    // }))

    const yelpData = [];
    const re = new RegExp('yelp_business_location_.*response\.json')
    const yelpFiles = fs.readdirSync(path.join(__dirname, "..", "..", "..", "public"))
        .filter(file => re.test(file));
    for (yelpFile of yelpFiles) {
        const fileData = fs.readFileSync(path.join(__dirname, "..", "..", "..", "public",yelpFile))
        const jsonData = JSON.parse(fileData);
        const businesses = jsonData['businesses']

        for (business of businesses) {
            yelpData.push({
                id: uuidv4(),
                name: business['name'],
                score: business['rating'],
                ratings: business['review_count'],
                category: business['categories'].map(category=>category.alias).join(','),
                imageUrl: business['image_url'],
                priceRange: business['price'],
                address: business['location']['display_address'].join(', '),
                zipCode: business['location']['zip_code'],
                lat: business['coordinates']['latitude'],
                lng: business['coordinates']['longitude']
            })
        }
    }
    // return [...newRestaurantsData, ...yelpData]
    return yelpData

};

module.exports = { createRestaurants, createRestaurantsFromData };