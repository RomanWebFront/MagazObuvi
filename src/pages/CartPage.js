import React from 'react';
import Cart from '../components/Cart.js';
import OrderForm from '../components/OrderForm.js';

class CartPage extends React.Component {
  render() {
    return (
      <div>
        < Cart />
        < OrderForm />
      </div>
    );
  }
}

export default CartPage;