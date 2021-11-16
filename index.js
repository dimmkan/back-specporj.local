require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./utils/database')
const filialRoutes = require('./routes/filial')
const userRoutes = require('./routes/user')
const doctorRoutes = require('./routes/doctor')
const pacientRoutes = require('./routes/pacient')
const authRoutes = require('./routes/auth')
const passport = require('passport')

const app = express()
const  LISTEN_PORT = process.env.PORT || 3000

app.use(cors())
app.options('*', cors)
app.use(express.json())
app.use(passport.initialize())
require('./middleware/authJwtMiddleware')(passport)

app.use('/api/auth', authRoutes)
app.use('/api/filial', filialRoutes)
app.use('/api/user', userRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/pacient', pacientRoutes)


async function start(){
    try {
        await sequelize.sync()
        app.listen(LISTEN_PORT)
    }catch (e) {
        console.log(e)
    }
}

start()
