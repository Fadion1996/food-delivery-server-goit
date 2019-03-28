const path = require('path');
const fs = require('fs');
const { getProductsByCategory, getProductsById } = require('../../helpers/get-route-handler');

const productsRoute = (req, res) => {
    const filePath = path.join(__dirname, '../../db/', 'products', 'all-products.json');

    res.set('Content-Type', 'application/json');

    if (req.url !== '/products') {
        return fs.readFile(filePath, 'utf8', (error, data) => {
            error && console.log(error);

            const parsedData = JSON.parse(data);

            let resData, status, id;

            const pathID = req.params.id;
            const pathCategory = req.url.split('/')[1];
            // get id from url
            if (!!pathID) {
                id = pathID.includes('?') ? null : pathID;
            }

            // 1. Возможность получить данные какого-либо продукта по id
            if (id) {
                status = 'success';
                resData = parsedData.filter(products => products.id.toString() === id) || []; // get product by id
            } else if (req.query) {
                status = 'success';
                // 2. Возможность получить данные нескольких продуктов по idшкам
                let queryArr = [];

                const {ids, category} = req.query;
                if (ids) {
                    queryArr = ids.split(','); // get ids array from url
                    resData = getProductsById(queryArr, parsedData);
                }
                if (category) {
                    queryArr = category.split(','); // get categories array from url
                    resData = getProductsByCategory(queryArr, parsedData);
                }
            }
            if (pathCategory === 'products' && !pathID && !req.query) {
                resData = parsedData;
            }

            if (!resData || !resData.length) {
                status = 'no products';
            }

            const response = {status: status, products: resData};
            res.end(JSON.stringify(response));
        });
    }

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
};

module.exports = productsRoute;