const db = require('../db');
const { Sequelize } = db;

const LineItem = db.define('lineItem', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        validate: {
            min: 1,
        },
    },
});

module.exports = LineItem;

