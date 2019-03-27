const fs = require('fs');
const path = require('path');
const util = require('util');

const ordersFolder = path.resolve(__dirname, '../../../', 'db/orders');

const writeFile = util.promisify(fs.writeFile);

const saveNewOrder = (data) => {
    const src = path.resolve('./src/db/users', 'orders.json');
    const dataStr = JSON.stringify(data);
    let dir = './src/db/orders/';
    !fs.existsSync(dir) && fs.mkdirSync(dir);

    return writeFile(src, dataStr);
};

const createOrder = (request, response) => {
    const order = request.body;
    const orderData =  { id: Math.random(), ...order };

    const sendResponse = () => {
        response.json({
            status: 'success',
            user: orderData
        });
    };

    const sendError = () => {
        response.status(400);
        response.json({
            error: 'user was not saved'
        });
    };

    saveNewOrder(orderData)
        .then(sendResponse)
        .catch(sendError);

};

module.exports = createOrder;