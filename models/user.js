const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('euser', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.INTEGER
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

module.exports = User;