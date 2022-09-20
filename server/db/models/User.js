const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avatar: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  creditCard: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isCreditCard: true,
    },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isOauth: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  googleId: {
    type: Sequelize.STRING,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

User.prototype.createOrderFromCart = async function(){
  const cart = await this.getCart();
  cart.isCart = false;
  return cart.save();
}

User.prototype.getCart = async function() {
  let order = await db.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true
    },
    include: [
      {
        model: db.models.lineItem,
        include: [db.models.dish]
      }
    ]
  });
  if (!order) {
    order = await db.models.order.create({ userId: this.id })
    order = await db.models.order.findByPk(order.id, {
      include: [db.models.lineItem]
    })
  }
  return order;
}

User.prototype.addToCart = async function(dish, quantity) {
  const cart = await this.getCart();
  let lineItem = await db.models.lineItem.findOne({
    where: {
      dishId: dish.id,
      orderId: cart.id
    }
  })
  if (lineItem) {
    lineItem.quantity = lineItem.quantity + quantity;
    if (lineItem.quantity != 0 ) {
      await lineItem.save();
    } else {
      await lineItem.destroy();
    }
  } else {
    await db.models.lineItem.create({
      dishId: dish.id,
      quantity,
      orderId: cart.id
    })
  }
  return this.getCart();
}

User.prototype.getOrders = async function() {
  let order = await db.models.order.findAll({
    where: {
      userId: this.id,
    },
    include: [
      {
        model: db.models.lineItem,
        include: [db.models.dish]
      }
    ]
  });
  return order;
}

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user) {
      throw "User does not exist!";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
