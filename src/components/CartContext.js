import { createContext } from 'react';

export const CartContext = createContext(null);

export const CartAdd = (currentCart, id, title, size, count, price) => {
    let newCart = [...currentCart];
    let found = newCart.find((element) => element.id === id && element.size === size);
    if (found) {
        found.count += count;
    } else {
        newCart.push({ id, title, size, count, price });
    }
    localStorage.setItem("currentCart", JSON.stringify(newCart));
    return newCart;
}

export const CartRemove = (currentCart, itemForDelete) => {
    let newCart = currentCart.filter((item) => item != itemForDelete);
    localStorage.setItem("currentCart", JSON.stringify(newCart));
    return newCart;
}

export const CartInit = () => {
    let newCart = JSON.parse(localStorage.getItem("currentCart"));
    if (!newCart)
        newCart = [];
    return newCart;
}

export const CartDelete = () => {
    let newCart = []
    localStorage.setItem("currentCart", JSON.stringify(newCart));
    return newCart;
}
