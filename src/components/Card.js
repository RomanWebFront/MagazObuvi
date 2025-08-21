import { useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { CartAdd, CartContext } from './CartContext.js';

const Card = () => {

    const { productId } = useParams();
    const { currentCart, setCurrentCart } = useContext(CartContext);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(-1);
    const [item, setItem] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [count, setCount] = useState(1);

    useEffect(() => {
        const url = "/api/items/" + productId;


        fetch(url)
            .then(res => res.json())
            .then(data => {
                setItem(data);
                setLoaded(true);
            });
    }, []);

    const navigate = useNavigate();

    const handleCartClick = () => {

        setCurrentCart(CartAdd(currentCart, item.id, item.title, item.sizes[selectedSizeIndex].size, count, item.price));
        navigate('/cart');

    };


    if (!loaded)
        return (<div class="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>);

    return (
        <section class="catalog-item">
            <h2 class="text-center">{item.title}</h2>
            <div class="row">
                <div class="col-5">
                    {item.images.length > 0 &&
                        <img src={item.images[0]}
                            class="img-fluid" alt="" />}
                </div>
                <div class="col-7">
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Артикул</td>
                                <td>{item.sku}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>{item.manufacturer}</td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>{item.color}</td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>{item.material}</td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>{item.season}</td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>{item.reason}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-center">
                        <p>Размеры в наличии:
                            {item.sizes
                                .filter((item) => item.available)
                                .map((item, index) =>
                                    <span key={index} onClick={() => setSelectedSizeIndex(index)}
                                        class={"catalog-item-size " + (selectedSizeIndex == index ? "selected" : "")}>{item.size}</span>
                                )}
                        </p>
                        <p>Количество: <span class="btn-group btn-group-sm pl-2">
                            <button onClick={() => (count > 1) && setCount(count - 1)}
                                class="btn btn-secondary">-</button>
                            <span class="btn btn-outline-primary">{count}</span>
                            <button onClick={() => (count < 10) && setCount(count + 1)} class="btn btn-secondary">+</button>
                        </span>
                        </p>
                    </div>
                    {(selectedSizeIndex != -1) &&
                        <button onClick={handleCartClick} class="btn btn-danger btn-block btn-lg">В корзину</button>
                    }
                </div>
            </div>
        </section>
    );
}

export default Card;