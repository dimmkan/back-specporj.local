const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const doctor = sequelize.define('Doctor', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: Sequelize.INTEGER
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        middleName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        specification: {
            type: Sequelize.STRING,
            allowNull: false
        },
        filialID: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        imageURI: {
            type: Sequelize.STRING,
            allowNull: true
        },
    },
    {
        timestamps: false,
        tableName: 'doctors'
    }
)

module.exports = doctor