// shop container
const shop = {};

// handle get shop request
shop.getShop = (req, res) => {
  res.render('shop', {
    pageTitle: 'Shop',
    activeShop: true,
    shopCss: true
  })
}

// handle get cart request
shop.getCart = (req, res) => {
  res.render('cart', {
    pageTitle: 'Cart',
    activeCart: true,
    cartCss: true
  })
}

// handle get order request
shop.getOrder = (req, res) => {
  res.render('order', {
    pageTitle: 'Order',
    activeOrder: true,
    orderCss: true
  })
}

module.exports = shop;
