import React from 'react';
import CatalogItemCard from './CatalogItemCard';
import { useEffect, useState } from "react"
import { SearchContext } from './SearchContext';
import { useContext } from 'react';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import useDebounce from "./useDebounce";

const Catalog = ({ showSearch }) => {
  const [categories, setCategories] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentSearch, setCurrentSearch } = useContext(SearchContext);
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [showLoadedMore, setShowLoadedMore] = useState(true);
  const [loaderMoreLoading, setLoaderMoreLoading] = useState(false);
  const [cardsLoading, setCardsLoading] = useState(false);


  const url = "/api/items";
  const categoriesUrl = "/api/categories";

  const refreshSearch = (searchQuery, category, offset) => {

    let query = "";
    if (!!searchQuery && category != -1) {
      query = "?q=" + searchQuery + "&categoryId=" + category;
    } else if (category != -1) {
      query = "?categoryId=" + category;
    } else if (!!searchQuery) {
      query = "?q=" + searchQuery;
    }
    if (offset) {
      if (query === "") {
        query = "?offset=" + offset;
      } else
        query = query + "&offset=" + offset;
    }
    setShowLoadedMore(false);
    return fetch(url + query)
      .then(res => res.json())
      .then(data => {
        if (data.length < 6) {
          setShowLoadedMore(false);
        } else {
          setShowLoadedMore(true);
        }
        if (offset) {
          let newArray = [].concat(catalogItems, data);
          setCatalogItems(newArray);
        } else {
          setCatalogItems(data);
        }
      });
  }

  useEffect(() => {


    let cardsFetch = fetch(url)
      .then(res => res.json())
      .then(data => {
        setCatalogItems(data);
      });

    let categoriesFetch = fetch(categoriesUrl)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      });
      Promise.all([cardsFetch, categoriesFetch])
      .then(() => setLoading(false));
  }, []);

  const selectCategory = (event, categoryId) => {
    event.preventDefault();
    setCurrentCategory(categoryId);
    setCardsLoading(true);
    refreshSearch(currentSearch, categoryId)
      .then(() => setCardsLoading(false));
  };

  const debouncedValue = useDebounce(currentSearch, 500);

  useEffect(() => {
        refreshSearch(currentSearch, currentCategory);
  }, [debouncedValue]);


  const changeSearch = (event) => {
    setCurrentSearch(event.target.value)
  };

  const loaderMore = () => {
    setLoaderMoreLoading(true);
    refreshSearch(currentSearch, currentCategory, catalogItems.length)
      .then(() => setLoaderMoreLoading(false));

  }


  if (loading)
    return (
      <section class="catalog">
        <h2 class="text-center">Каталог</h2>
        <div class="preloader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
    );

  return (
    <section class="catalog">
      <h2 class="text-center">Каталог</h2>
      <div>
        {showSearch &&
          <form class="catalog-search-form form-inline">
            <input value={currentSearch} onChange={event => changeSearch(event)} class="form-control" placeholder="Поиск" />
          </form>
        }
        <ul class="catalog-categories nav justify-content-center">
            <li class="nav-item">
              <a class={"nav-link" + (currentCategory === -1 ? " active" : "")} onClick={(e) => selectCategory(e, -1)} href="#">Все</a>
            </li>
            {categories.map((item) =>
              <li class="nav-item" key={item.id}>
                <a class={"nav-link" + (currentCategory === item.id ? " active" : "")} onClick={(e) => selectCategory(e, item.id)} href="#">{item.title}</a>
              </li>
            )}
        </ul>
        {cardsLoading &&
          <div class="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        }
        {!cardsLoading &&
          <div class="row">
            {catalogItems.map((item) => <CatalogItemCard key={item.id} obj={item} isCatalogItem={true} />)}
          </div>
        }
        {loaderMoreLoading &&
                  <div class="text-center">
          <div class="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          </div>
        }
        {showLoadedMore && !loaderMoreLoading &&
          <div class="text-center">
              <button class="btn btn-outline-primary" onClick={loaderMore}>Загрузить ещё</button>
          </div>
        }
      </div>
    </section>
  );
}

export default Catalog;