const { db, models } = require("../index");
const { User, Address, Restaurant, Order, LineItem, Dish, Category, Review } =
  models;
const createUsers = require("./createUsers");
const {
  createRestaurants,
  createRestaurantsFromData,
} = require("./createRestaurants");
const createDishes = require("./createDishes");
const createOrders = require("./createOrders");
const createLineItems = require("./createLineItems");
const createAddresses = require("./createAddresses");
const seedCuisines = require("./seedCuisines");
const { CATEGORIES } = require("./createCategories");
const { REVIEWS } = require("./createReviews");

const { faker } = require("@faker-js/faker");

const path = require("path");
const syncAndSeed = async () => {
  try {
    await db.authenticate();
    await db.sync({ force: true });

    console.log("Seeding users...");
    const users = await Promise.all(
      createUsers(20).map((user) => {
        return User.create(user);
      })
    );
    console.log("Seeding addresses...");
    const addresses = await Promise.all(
      createAddresses(users).map((address) => {
        Address.create(address);
      })
    );

    console.log("Seeding cuisines...");
    const cuisines = await seedCuisines();

    console.log("Seeding restaurants...");
    const restaurants = await Promise.all(
      createRestaurantsFromData().map((restaurant) => {
        const cuisine = cuisines.find((cuisine) =>
          restaurant.category.toLowerCase().includes(cuisine.name.toLowerCase())
        );
        const cuisineId = cuisine ? cuisine.id : null;
        return Restaurant.create({
          ...restaurant,
          cuisineId: cuisineId,
          // imageUrl: restaurant.imageUrl
          //   ? restaurant.imageUrl
          //   : faker.image.food(500, 300, true),
        });
      })
    );
    console.log("Seeding categories...");
    const categories = await Promise.all(
      CATEGORIES.map((category) => Category.create({ name: category }))
    );
    console.log("Seeding dishes...");
    const dishes = await Promise.all([
      Dish.create({
        name: "Crab Rangoon",
        price: 7.95,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photos/1d2984a6-3310-4841-9156-9b5738c545e9-retina-large-jpeg",
        description:
          "4 crispy crab rangoons filled with a house blend filling.",
        categoryId: categories.find((category) => category.name === "Starters")
          .id,
      }),
      Dish.create({
        name: "Edamame",
        price: 4.99,
        imageUrl:
          "https://www.kobejones.com.au/wp-content/uploads/2016/09/shutterstock_139667434-1024x1024.jpg",
        description: "Boiled soy beans in the pod with sea salt.",
        categoryId: categories.find((category) => category.name === "Starters")
          .id,
      }),
      Dish.create({
        name: "Mozzarella Bread Stix",
        price: 13.0,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/ef176f37-737f-4aa7-baa7-5c1043062ef5-495d0c28-a5e5-4462-a487-534fc4e049bd-retina-large.JPG",
        description:
          "Mozzarella, provolone, shake cheese & oregano, served with marinara.",
        categoryId: categories.find((category) => category.name === "Starters")
          .id,
      }),
      Dish.create({
        name: "BANG BANG SHRIMP",
        price: 18.49,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/370cfc06-b726-4564-896f-d3cedd70405e-3f361ff3-0a5a-4da7-8d3e-b490e02744ea-retina-large.JPG",
        description:
          "Fried shrimp, scallions, sriracha, toasted sesame seeds, chili aioli.",
        categoryId: categories.find((category) => category.name === "Starters")
          .id,
      }),
      Dish.create({
        name: "Mediterranean Veggie",
        price: 13.49,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/31735978-7413-4856-8112-b9f1af27bce2-retina-large.JPG",
        description:
          "Oven-roasted turkey breast raised without antibiotics, Applewood-smoked bacon, smoked Gouda, emerald greens, vine-ripened tomatoes, signature sauce , salt and pepper on Tomato Basil Bread.",
        categoryId: categories.find(
          (category) => category.name === "Sandwiches"
        ).id,
      }),
      Dish.create({
        name: "Toasted Steak & White Cheddar",
        price: 15.79,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photos/19653c12-31bd-4cbd-8fa8-04b31bedd33a-retina-large-jpeg",
        description:
          "Grass fed beef, aged white cheddar, pickled red onions and horseradish sauce on Artisan Ciabatta.",
        categoryId: categories.find(
          (category) => category.name === "Sandwiches"
        ).id,
      }),
      Dish.create({
        name: "Golf Choripan Sandwich Dinner",
        price: 16.25,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photos/b9aae932-7e3c-4d20-9749-9bb4fbadc349-retina-large-jpeg",
        description:
          "Sausage, salsa golf, red onion, tomato, and lettuce chimichurri. Served with fresh-cut fries.",
        categoryId: categories.find(
          (category) => category.name === "Sandwiches"
        ).id,
      }),
      Dish.create({
        name: "CHICKEN CAPRESE",
        price: 9.89,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/f04ad8ed-745d-4804-a511-50a5b1d932b3-retina-large.png",
        description:
          "grilled chicken, fresh mozzarella, tomato, balsamic glaze & pesto pressed to perfection.",
        categoryId: categories.find(
          (category) => category.name === "Sandwiches"
        ).id,
      }),
      Dish.create({
        name: "SUPERGREEN CAESAR",
        price: 11.89,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/6b5b5445-8b51-4c3d-aecc-a779a7feefbd-retina-large.jpg",
        description:
          "grilled chicken, shredded parmesan, tomatoes, & parmesan crisps on a bed of romaine and spinach & served with caesar dressing",
        categoryId: categories.find((category) => category.name === "Salads")
          .id,
      }),
      Dish.create({
        name: "Greek Salad",
        price: 10.39,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photos/c358278f-138e-4e5d-803d-7be02f736d5d-retina-large-jpeg",
        description:
          "Romaine, grape tomatoes, feta, red onions, kalamata olives, salt and pepper tossed in Greek dressing with a pepperoncini.",
        categoryId: categories.find((category) => category.name === "Salads")
          .id,
      }),
      Dish.create({
        name: "Green Passion Smoothie",
        price: 7.09,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photos/14a9bacb-19a2-41cc-af4a-d8eb6f42c200-retina-large-jpeg",
        description:
          "Peach and mango purees and white grape and passionfruit juice concentrates blended with fresh spinach and ice.",
        categoryId: categories.find((category) => category.name === "Drinks")
          .id,
      }),
      Dish.create({
        name: "Orange Juice",
        price: 3.69,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photos/87c33975-c0c7-4b72-abdb-b1d4cd746f51-retina-large-jpeg",
        description: "Premium orange juice. ",
        categoryId: categories.find((category) => category.name === "Drinks")
          .id,
      }),
      Dish.create({
        name: "Kale & Cabbage Slaw",
        price: 6.25,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/93cd6a49-cf55-4ca2-b97d-35da024d742d-retina-large.jpeg",
        description:
          "with Citrus Poppyseed Vinaigrette and Spiced Sunflower Seeds",
        categoryId: categories.find((category) => category.name === "Sides").id,
      }),
      Dish.create({
        name: "Candied Jalapeño Pimento Cheese Dip",
        price: 9.95,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/06431cda-4a04-4256-8974-5a8f7ec63c5b-retina-large.jpeg",
        description:
          "Candied Jalapeño Pimento Cheese dip with Chicken Crunchies and House Fried Tortilla Chips",
        categoryId: categories.find((category) => category.name === "Sides").id,
      }),
      Dish.create({
        name: "Mac & Cheese",
        price: 4.95,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/7efa79f9-e65e-4397-bfab-a0536da45140-retina-large.jpeg",
        description: "The perfect creamy gooey classic American comfort food.",
        categoryId: categories.find((category) => category.name === "Sides").id,
      }),
      Dish.create({
        name: "Impossible Burger: Classic Style",
        price: 13.95,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/80f88366-c008-4b6f-8b7d-0a99b3a9435d-retina-large.jpeg",
        description:
          "Impossible Meatless Patty, American cheese, red onion, dijonnaise and pickles on brioche. Made with fresh sirloin Angus steak served medium.",
        categoryId: categories.find((category) => category.name === "Entrees")
          .id,
      }),
      Dish.create({
        name: "Crunchy Taco",
        price: 4.15,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/58da85b5-088e-49d3-991d-eace98b332ec-retina-large.jpeg",
        description:
          "crunchy shell, ground beef. black beans, Mexican crema, cabbage, cilantro, cheddar/habanero powder. Single taco.",
        categoryId: categories.find((category) => category.name === "Entrees")
          .id,
      }),
      Dish.create({
        name: "Penne alla Vodka",
        price: 12.25,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/67e7cc96-4eaf-4b35-a74b-e6f8d8153eb6-retina-large.jpg",
        description: "Vodka, tomatoes, garlic, red chili, basil and cream.",
        categoryId: categories.find((category) => category.name === "Entrees")
          .id,
      }),
      Dish.create({
        name: "Salmon Avocado Maki",
        price: 7.75,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/bc79749c-5b87-49ad-8a2b-646fce6b53cb-retina-large.jpg",
        description: "Fresh salmon sashimi & avocado.",
        categoryId: categories.find((category) => category.name === "Entrees")
          .id,
      }),
      Dish.create({
        name: "Tropical Shrimp Poke",
        price: 13.55,
        imageUrl:
          "https://img.cdn4dd.com/p/fit=cover,width=1000,format=auto,quality=50/media/photosV2/35a631bf-6948-4f83-a9f6-39b04f10b933-retina-large.jpg",
        description:
          "Cooked shrimp, seasoned Japanese rice, crunchy noodles, red tobiko, sweet peppers, red onions, cucumbers, avocado, other vegetables, honey spicy mayo, Ponzu sauce and Togarashi .",
        categoryId: categories.find((category) => category.name === "Entrees")
          .id,
      }),
    ]);

    // console.log("Seeding orders...");
    // const orders = await Promise.all(
    //   createOrders(20, users).map((order) => {
    //     return Order.create(order);
    //   })
    // );
    console.log("Seeding reviews ...");
    const reviews = await Promise.all(
      REVIEWS.map((review) => {
        Review.create({
          ...review,
          userId: users[Math.floor(Math.random() * users.length)].id,
          restaurantId: restaurants[Math.floor(Math.random() * 100)].id,
        });
      })
    );
    // console.log("Seeding line items...");
    // const lineItems = await Promise.all(
    //   createLineItems(10, dishes, orders).map((lineItem) => {
    //     return LineItem.create(lineItem);
    //   })
    // );
  } catch (ex) {
    console.log(ex);
  }
};

// Execute the `seed` function, IF we ran this module directly (`node seed`)
if (module === require.main) {
  syncAndSeed().then(() => {
    console.log("Seeding done");
  });
}

module.exports = syncAndSeed;
