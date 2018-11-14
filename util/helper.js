// helper container
const helper = {};

// add sales price proprty product object based on if its on sale
helper.addSalesPrice = (productArray) => {
  productArray.forEach(product => {
    if (product.sale) {
      product.salePrice = (product.price - (product.price * .25)).toFixed(2)
    }
  })
}

module.exports = helper;