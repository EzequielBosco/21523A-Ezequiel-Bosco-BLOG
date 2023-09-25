const { Sequelize, DataTypes } = require('sequelize')
const { db } = require('../config/index.config')

// const sequelize = new Sequelize(db.name, db.user, '', {
//     host: db.host,
//     dialect: db.dialect
// })

const sequelize = new Sequelize(db.name, db.user, db.pass, {
    host: db.host,
    dialect: db.dialect
})

const connectBD = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection to BD successful')
    } catch (error) {
        console.log('Error', + error)
    }
}

module.exports = {
    connectBD,
    sequelize,
    Sequelize,
    DataTypes
}