import { createContext } from 'react';

export const CartContext = createContext(null);

export const CartAdd = (cartContext, id, title, size, count, price) => {
    let newCart = [...cartContext];
    let found = newCart.find((element) => element.id === id && element.size === size);
    if (found) {
        found.count += count;
    } else {
        newCart.push({ id, title, size, count, price });
    }
    return newCart;
}


