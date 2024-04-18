const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense-app', 'root', 'RRRR@NNNN', {
  host: 'localhost',
  dialect: 'mysql', 
});

const expenseModel = sequelize.define('Expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    amount: {
        type: Sequelize.FLOAT, 
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }  
});

module.exports = expenseModel;