const fs = require('fs');
const path = require('path');
const url = require("url");
const { getProductsByCategory, getProductsById } = require('../../helpers/get-route-handler');

const productsRoute = (req, res) => {
  const filePath = path.join(__dirname, '../../db/', 'products', 'all-products.json');

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  if (req.url !== '/products') {
    return fs.readFile(filePath, 'utf8', (error, data) => {
      error && console.log(error);
      
      const parsedData = JSON.parse(data);

      let resData, status;

      const pathID = req.url.split('/')[2];
      // get id from url
      const id = pathID.includes('?') ? null : pathID;

      const { query } = url.parse(req.url, true);

      // 1. Возможность получить данные какого-либо продукта по id
      if (id) {
        status = 'success'
        resData = parsedData.filter(products => products.id.toString() === id) || []; // get product by id
      } else if (query) {
        status = 'success'
        // 2. Возможность получить данные нескольких продуктов по idшкам
        let queryArr = [];

        const { ids, category } = query;
        if (ids) {
          queryArr = ids.split(','); // get ids array from url
          resData = getProductsById(queryArr, parsedData);
        }
        if (category) {
          queryArr = category.split(','); // get categories array from url
          resData = getProductsByCategory(queryArr, parsedData);
        }
      } 
      !resData.length && (status='no products')

      const response = { status: status, products: resData };
      res.end(JSON.stringify(response));
    });
  }

  const readStream = fs.createReadStream(filePath);  
  readStream.pipe(res);
};

module.exports = productsRoute;