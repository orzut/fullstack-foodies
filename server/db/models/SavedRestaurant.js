const db = require("../db");
const Sequelize = require("sequelize");

const SavedRestaurant = db.define("savedRestaurant", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
});

module.exports = SavedRestaurant;