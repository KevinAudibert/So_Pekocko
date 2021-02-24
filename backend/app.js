require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pn9lj.mongodb.net/${process.env.DB_CLUSTER}?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100 
  });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
    next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;