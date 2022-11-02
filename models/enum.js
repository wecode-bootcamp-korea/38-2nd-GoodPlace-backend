const priceEnum = Object.freeze({
  T_PRICE_MULTIPLE : 4,
  S_PRICE_MULTIPLE : 12
});

const findEmptyProductEnum = Object.freeze({
  EMPTY_PRODUCT_CONSTANT : 5
});

const checkOverlabReservation = Object.freeze({
  BORROW_CONDITION_POINT_ONE : '12:00:00',
  BORROW_CONDITION_POINT_TWO : '16:00:00',
  BORROW_CONDITION_POINT_THREE : '20:00:00'
});

module.exports = {
  priceEnum,
  findEmptyProductEnum,
  checkOverlabReservation
}