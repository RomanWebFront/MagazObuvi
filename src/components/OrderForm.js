import React from 'react';
import { CartContext, CartDelete, CartRemove } from './CartContext.js';
import { useContext } from 'react';
import { useState } from 'react';

const url = "/api/order";

const OrderForm = () => {

  const { currentCart, setCurrentCart } = useContext(CartContext);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (event) => {

    event.preventDefault();

    let order = {
      "owner": {
        "phone": phone,
        "address": address
      },
      "items": currentCart.map((value) => ({ "id": value.id, "price": value.price, "count": value.count }))
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)
    })

      .then(result => {
        setCurrentCart(CartDelete());
        setErrorMessage("Заказ успешно оформлен");
      },
        error => {
          setErrorMessage("Возникла ошибка при оформлении заказа");
        });

  };

  return (
    <section class="order">
      <h2 class="text-center">Оформить заказ</h2>
      <div class="card">
        <form class="card-body">
          <div class="form-group">
            <label for="phone">Телефон</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} class="form-control" id="phone" placeholder="Ваш телефон" />
          </div>
          <div class="form-group">
            <label for="address">Адрес доставки</label>
            <input value={address} onChange={e => setAddress(e.target.value)} class="form-control" id="address" placeholder="Адрес доставки" />
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="agreement" />
            <label class="form-check-label" for="agreement">Согласен с правилами доставки</label>
          </div>
          <button type="submit" class="btn btn-outline-secondary" onClick={(e) => handleSubmit(e)}>Оформить</button>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
      </div>
    </section>
  );
}



export default OrderForm;