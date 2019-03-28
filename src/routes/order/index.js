const fs = require('fs');
const path = require('path');
const util = require('util');

const productsPath = path.join(__dirname, '../../db/', 'products', 'all-products.json');
const writeFile = util.promisify(fs.writeFile);

const saveNewOrder = (order) => {

    // find products by ids in all-products.json
    let result = [],
        src,
        dataStr,
        allProducts = fs.readFileSync(productsPath);
    const parseProducts = JSON.parse(allProducts);

    order.products.map(id => {
        parseProducts.filter(products =>
            products.id.toString() === id &&
            result.push(products)
        );
    });

    // create folder
    if (result) {
        let dir = './src/db/orders/';
        !fs.existsSync(dir) && fs.mkdirSync(dir);
    }

    // write order to orders.json
    src = path.resolve('./src/db/orders', 'orders.json');
    dataStr = JSON.stringify(result);
    if (result.length) {
        return writeFile(src, dataStr)
    } else return Promise.reject('not found');
};

const createOrder = (request, response) => {
    const order = request.body;
    const orderData =  { id: Math.random(), ...order };

    const sendResponse = () => {
        response.json({
            status: 'success',
            order: orderData
        });
    };

    const sendError = () => {
        response.status(400);
        response.json({
            status: 'failed',
            order: null
        });
    };

    saveNewOrder(orderData)
        .then(sendResponse)
        .catch(sendError);

};

module.exports = createOrder;