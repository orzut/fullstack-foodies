const db = require('../db');
const { Sequelize } = db;

const Order = db.define('order', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    isCart: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Order;