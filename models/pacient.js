const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const pacient = sequelize.define('Pacient', {
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
        passportSerial: {
            type: Sequelize.STRING,
            allowNull: false
        },
        passportNum: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        omsNum: {
            type: Sequelize.STRING,
            allowNull: false
        },
        diagnosis: {
            type: Sequelize.STRING,
            allowNull: false
        },
        recipe: {
            type: Sequelize.STRING,
            allowNull: false
        },
        doctorID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        filialID: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
    },
    {
        timestamps: false,
        tableName: 'pacients'
    }
)

module.exports = pacient