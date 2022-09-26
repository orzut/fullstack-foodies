const db = require("../db");
const Sequelize = require("sequelize");

const SavedOrder = db.define("savedOrder", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
});

module.exports = SavedOrder;