import React from 'react';
import CatalogItemCard from './CatalogItemCard';
import { useEffect, useState } from "react"
import { SearchContext } from './SearchContext';
import { useContext } from 'react';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

const Catalog = ({showSearch}) => {
  const [categories, setCategories] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { currentSearch, setCurrentSearch } = useContext(SearchContext);
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [showLoadedMore, setShowLoadedMore] = useState(true);

  const url = "/api/items";
  const categoriesUrl = "/api/categories";

  const refreshSearch = (searchQuery, category, offset) => {
    //  setLoaded(false);

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


    fetch(url + query)
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
        //      setLoaded(true);
      });
  }

  useEffect(() => {


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
  }, []);

  const selectCategory = (event, categoryId) => {
    event.preventDefault();
    setCurrentCategory(categoryId);
    refreshSearch(currentSearch, categoryId);
  };

  const changeSearch = (event) => {
    setCurrentSearch(event.target.value)
    refreshSearch(event.target.value, currentCategory);
  };

  const loaderMore = () => {
    refreshSearch(currentSearch, currentCategory, catalogItems.length);

  }

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
          { showSearch && 
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
          <div class="row">
            {catalogItems.map((item) => <CatalogItemCard key={item.id} obj={item} isCatalogItem={true} />)}
          </div>
          {showLoadedMore &&
            <div class="text-center">
              <button class="btn btn-outline-primary" onClick={loaderMore}>Загрузить ещё</button>
            </div>
          }
        </div>
      }
    </section>
  );
}

export default Catalog;