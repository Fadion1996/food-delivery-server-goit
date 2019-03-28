const mainRoute = require('./main');
const productsRoute = require('./products');
const getUser = require('./signup/get-user');
const createUser = require('./signup');
const createOrder = require('./order');
const express = require('express');
const router = express.Router();

const checkUser = (req, resp, next) => {
    if (req.body.userName) {
        next();
        return;
    }

    resp.status(400);
    resp.json({
        error: 'user has no "userName" field'
    })
};

const checkOrder = (req, resp, next) => {
    if (req.body.products.length) {
        next();
        return;
    }
    resp.status(400);
    resp.json({
        error: 'order has no params field'
    })
};

router
    .get('/', mainRoute)
    .get('/products/:id', productsRoute)
    .get('/products/', productsRoute)
    .get('/users/:id', getUser)
    .post('/users', checkUser, createUser)
    .post('/orders', checkOrder, createOrder);

module.exports = router;