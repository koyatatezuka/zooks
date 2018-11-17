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

// add orderDate property to each order object in array
helper.addOrderDate = (orderArray) => {
  orderArray.forEach(order => {
    const month = order.date.getMonth();
    const day = order.date.getDate();
    const year = order.date.getFullYear();
  
    order.orderDate = `${month + 1}/${day}/${year}`
  })
}

  // add ETA property to each order object in array
  helper.addETA = (orderArray) => {
    orderArray.forEach(order => {
      const earlyETA = new Date(order.date.setDate(order.date.getDate() + 5));
  
      const eMonth = earlyETA.getMonth();
      const eDay = earlyETA.getDate();
      const eYear = earlyETA.getFullYear();
  
      const lateETA = new Date(order.date.setDate(order.date.getDate() + 2))
  
      const lMonth = lateETA.getMonth();
      const lDay = lateETA.getDate();
      const lYear = lateETA.getFullYear();
  
      order.ETA = `${eMonth + 1}/${eDay}/${eYear} - ${lMonth + 1}/${lDay}/${lYear}`
  
    })
  }

module.exports = helper;