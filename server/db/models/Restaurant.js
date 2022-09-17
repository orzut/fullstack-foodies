const db = require("../db");
const Sequelize = require("sequelize");

const Restaurant = db.define('restaurant', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    score: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ratings: {
        type: Sequelize.STRING,
        allowNull: true
    },
    category: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    priceRange: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    zipCode: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lat: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lng: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Restaurant;
