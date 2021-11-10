const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const user = sequelize.define('User', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM('user, superuser, admin'),
            allowNull: false
        },
        filialID: {
            allowNull: true,
            type: Sequelize.INTEGER
        },
    },
    {
        timestamps: false,
        tableName: 'users'
    }
)

module.exports = user