const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const MONGODB_URI = process.env.MONGODB_URI;

const UserRouter = require('./routes/userroute');


const app = express();


app.use(express.json({ limit: '1000mb' }));
app.use(cors());
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send('REUNION BACKEND ASSIGNMENT');
});

app.use('/api/',
    UserRouter,
);


app.listen(process.env.PORT, () => {
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log("Mongo DB connected successfully!");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });

    console.log(`Listening at port ${process.env.PORT}`);
});