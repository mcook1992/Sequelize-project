//connecting to Sequelize

const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelize = new Sequelize("Burger", "root", "Shmaavmc1", {
  host: "localhost",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

//making sure connection works:

sequelize
  .authenticate()
  .then(() => {
    // console.log("Connection has been established successfully.");
  })
  .catch(err => {
    // console.error("Unable to connect to the database:", err);
  });

const Burger = sequelize.define(
  "burgers",
  {
    // attributes
    burger_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    devoured: {
      type: Sequelize.BOOLEAN
      // allowNull defaults to true
    }
  },
  {
    // options
  }
);

Burger.sync({ force: true }).then(function(thing) {
  //   console.log("We managed to sync");

  Burger.create({
    burger_name: "Maya",
    description: "Product of Michael and Carla",
    devoured: false
  }).then(function(element) {
    // console.log("The added row is: " + element);
  });

  Burger.create({
    burger_name: "Classic",
    description: "A burger like Grams used to make",
    devoured: false
  }).then(function(element) {
    // console.log("The added row is: " + element);
  });

  Burger.create({
    burger_name: "Baconator",
    description: "The classic with bacon. Lots of bacon.",
    devoured: false
  }).then(function(element) {
    // console.log("The added row is: " + element);
  });
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  Burger: Burger
};
