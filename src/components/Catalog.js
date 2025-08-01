import React from 'react';
import CatalogItemCard from './CatalogItemCard';
import { useEffect, useState } from "react"

const Catalog = () => {
  const [categories, setCategories] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const url = "http://localhost:7070/api/items";
    const categoriesUrl = "http://localhost:7070/api/categories";

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCatalogItems(data);
        setLoaded(true);
      });

    fetch(categoriesUrl)
              .then(res => res.json())
              .then(data => {
                  setCategories(data);
              });
  });

  const selectCategory = (e,categoryId)=>{
    e.preventDefault();
    console.log('category = '+categoryId);
  };

  return (
    <section class="catalog">
      <h2 class="text-center">Каталог</h2>
      {!loaded &&
        <div class="preloader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      }
      {loaded &&
        <div>
          <form class="catalog-search-form form-inline">
            <input class="form-control" placeholder="Поиск" />
          </form>
          <ul class="catalog-categories nav justify-content-center">
            <li class="nav-item">
              <a class="nav-link active" onClick={(e)=>selectCategory(e,null)} href="#">Все</a>
            </li>
            {categories.map((item) =>
            <li class="nav-item">
              <a class="nav-link" onClick={(e)=>selectCategory(e,item.id)} href="#">{item.title}</a>
            </li>
            )}
          </ul>
          <div class="row">
            {catalogItems.map((item) => <CatalogItemCard key={item.id} obj={item} isCatalogItem={true} />)}
          </div>
          <div class="text-center">
            <button class="btn btn-outline-primary">Загрузить ещё</button>
          </div>
        </div>
      }
    </section>
  );
}

export default Catalog;