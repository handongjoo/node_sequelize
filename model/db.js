let Sequelize = require("sequelize");
const {DataTypes} = require('sequelize');
let sequelize;

sequelize = new Sequelize("", {
    host: 'localhost',
    port: 3306,
    dialect: "mysql",
    timezone: "+09:00",
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
        freezeTableName: true
    }
})


let db = {};
db.users = require(__dirname + '/users.js')(sequelize, DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;