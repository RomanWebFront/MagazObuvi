import React from 'react';
import { CartContext, CartDelete, CartRemove } from './CartContext.js';
import { useContext } from 'react';

const OrderForm = () => {

  const { currentCart, setCurrentCart } = useContext(CartContext);

  const handleSubmit = () => {
    setCurrentCart(CartDelete());
  };

  return (
    <section class="order">
      <h2 class="text-center">Оформить заказ</h2>
      <div class="card">
        <form class="card-body">
          <div class="form-group">
            <label for="phone">Телефон</label>
            <input class="form-control" id="phone" placeholder="Ваш телефон" />
          </div>
          <div class="form-group">
            <label for="address">Адрес доставки</label>
            <input class="form-control" id="address" placeholder="Адрес доставки" />
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="agreement" />
            <label class="form-check-label" for="agreement">Согласен с правилами доставки</label>
          </div>
          <button type="submit" class="btn btn-outline-secondary" onClick={handleSubmit}>Оформить</button>
        </form>
      </div>
    </section>
  );
}

export default OrderForm;