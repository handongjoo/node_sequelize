module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
        idx: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type:DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type:DataTypes.STRING(50),
            allowNull: false
        }
    })
}