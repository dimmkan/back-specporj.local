const express = require('express')
require('dotenv').config()

const sequelize = require('./utils/database')
const path = require('path')
const filialRoutes = require('./routes/filial')
const userRoutes = require('./routes/user')

const app = express()
const  LISTEN_PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api/filial', filialRoutes)
app.use('/api/user', userRoutes)

async function start(){
    try {
        await sequelize.sync()
        app.listen(LISTEN_PORT)
    }catch (e) {
        console.log(e)
    }
}

start()
