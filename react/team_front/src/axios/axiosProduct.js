import axiosInstance from "./axiosInstance"

async function _getProductList(onFullfilled, onRejected) {
  await axiosInstance
    .get('/product/list')
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _getProduct(id, onFullfilled, onRejected) {
  await axiosInstance
    .get(`/product/${id}`)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _postProduct(product, onFullfilled, onRejected) {
  await axiosInstance
    .post('/product', product)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _putProduct(id, product, onFullfilled, onRejected) {
  await axiosInstance
    .get(`/product/${id}`, product)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _deleteProduct(id, onFullfilled, onRejected) {
  await axiosInstance
    .get(`/product/${id}`)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _getProductByCategory(category, onFullfilled, onRejected) {
  await axiosInstance
    .get(`/product?category=${category}`)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _getFavorite(payload, onFullfilled, onRejected) {
  await axiosInstance
    .get('/favorite', payload)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _postCart(cart, onFullfilled, onRejected) {
  await axiosInstance
    .post('/cart', cart)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _getCart(memberid, onFullfilled, onRejected) {
  await axiosInstance
    .get(`/cart?id=${memberid}`)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _deleteCart(cart, onFullfilled, onRejected) {
  await axiosInstance
    .delete(`/cart`, cart)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _getDiscountList(scope, timezone, onFullfilled, onRejected) {
  await axiosInstance
    .get(`/discount/list?scope=${scope}?tz=${timezone}`)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _postDiscount(onFullfilled, onRejected) {
  await axiosInstance
    .post(`/discount`, discount)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _deleteDiscount(id, onFullfilled, onRejected) {
  await axiosInstance
    .delete(`/delete/${id}`, cart)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _getPurchase(id, onFullfilled, onRejected) {
  await axiosInstance
    .get(`/purchase`, id)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _getPurchaseList(onFullfilled, onRejected) {
  await axiosInstance
    .get(`/purchase/list`)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _postPurchase(purchase, onFullfilled, onRejected) {
  await axiosInstance
    .post('/purchase', purchase)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _deletePurchase(id, onFullfilled, onRejected) {
  await axiosInstance
    .delete(`/purchase/${id}`)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}


const axiosProduct = {
  getProductList: _getProductList,
  getProduct: _getProduct,
  postProduct: _postProduct,
  putProduct: _putProduct,
  deleteProduct: _deleteProduct,
  getProductByCategory: _getProductByCategory,
  getFavorite: _getFavorite,
  getCart: _getCart,
  postCart: _postCart,
  deleteCart: _deleteCart,
  getDiscountList:_getDiscountList,
  postDiscount: _postDiscount,
  deleteDiscount:_deleteDiscount,
  getPurchase: _getPurchase,
  getPurchaseList: _getPurchaseList,
  postPurchase: _postPurchase,
  deletePurchase: _deletePurchase,
}

export default axiosProduct