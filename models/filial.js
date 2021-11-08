const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const filial = sequelize.define('Filial', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
},
    {
        timestamps: false,
        tableName: 'filials'
    }
)

module.exports = filial