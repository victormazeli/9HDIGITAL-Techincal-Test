const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

/**
 *  Sequlize ORM is used as the ORM to Interact with the Database. 
 * 
 * This file  Create a class which represents and Entity in the Database (Table and columns)
 */

class Deal extends Sequelize.Model {}

Deal.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    hs_priority: {
      type: Sequelize.STRING,
    },
    dealname: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.STRING,
    },
    closedate: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Deals',
    timestamps: true
  }
);


module.exports = {
  sequelize,
  Deal,
};
