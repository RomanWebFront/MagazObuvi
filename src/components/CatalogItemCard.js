import React from 'react';
import { Link } from 'react-router-dom';

const CatalogItemCard = ({obj, isCatalogItem}) => {
  return (
    <div class="col-4">
      <div class={"card "+(isCatalogItem?"catalog-item-card":"")}>
        {obj.images.length>0 && 
        <img src={obj.images[0]}
          class="card-img-top img-fluid" alt={obj.title} />
        }
        <div class="card-body">
          <p class="card-text">{obj.title}</p>
          <p class="card-text">{obj.price} руб.</p>
          <Link class="btn btn-outline-primary" to={"/products/" + obj.id}>Заказать</Link>
        </div>
      </div>
    </div>
  );
}

export default CatalogItemCard;