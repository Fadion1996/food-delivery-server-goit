const getValues = arr =>
  arr.map(({ id, sku, name, description }) => {
    return { id, sku, name, description };
  });

const getProductsByCategory = (queryArr, parsedData) => {
  const productsArr = [];
  queryArr.map(category =>
    parsedData.map(p =>
      p.categories.forEach(e => {
        e === category && !productsArr.includes(p) && productsArr.push(p);
      })
    )
  );
  return getValues(productsArr);
};

const getProductsById = (queryArr, parsedData) => {
  const productsArr = [];
  parsedData.map(p =>
    queryArr.forEach(id => p.id.toString() === id && productsArr.push(p))
  );
  return getValues(productsArr);
};

module.exports = { getProductsByCategory, getProductsById };
