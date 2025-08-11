import React from 'react';
import { useContext } from 'react';
import { CartContext, CartRemove } from './CartContext.js';
import { Link } from 'react-router-dom';
import CartPage from '../pages/CartPage.js';



const Cart = () => {
    const { currentCart, setCurrentCart } = useContext(CartContext);

    const DeleteItem = (itemForDelete) => {
        setCurrentCart(CartRemove(currentCart, itemForDelete));
    };

    return (
        <section class="cart">
            <h2 class="text-center">Корзина</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Размер</th>
                        <th scope="col">Кол-во</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col">Итого</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCart.map((item, index) =>
                        <tr key={item.id + item.count}>
                            <td scope="row">{index + 1}</td>
                            <td><Link to={"/products/" + item.id}>{item.title}</Link></td>
                            <td>{item.size}</td>
                            <td>{item.count}</td>
                            <td>{item.price + " руб."}</td>
                            <td>{item.price * item.count + " руб."}</td>
                            <td><button onClick={() => DeleteItem(item)} class="btn btn-outline-danger btn-sm">Удалить</button></td>
                        </tr>
                    )}

                    <tr>
                        <td colspan="5" class="text-right">Общая стоимость</td>
                        <td>{currentCart.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.count, 0) + " руб."}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}


export default Cart;