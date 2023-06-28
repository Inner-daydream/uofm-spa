const routes = require('./routes/routes');

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const DB_URL = process.env.DB_URL;
(async () => {
    try {
        await mongoose.connect(DB_URL)
    } catch (err) {
        console.log('Error occured while conneting to database: ' + err)
    }
})()
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


const MAJOR_VERSION = process.env.MAJOR_VERSION
const PORT = process.env.PORT || 3000
app.use('/api/' + MAJOR_VERSION, routes)
console.log('API Version: ' + MAJOR_VERSION)
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})

