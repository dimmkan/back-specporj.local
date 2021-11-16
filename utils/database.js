const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_USER_PW, {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
})



module.exports = sequelize