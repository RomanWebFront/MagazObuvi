import React from 'react';
import CatalogItemCard from './CatalogItemCard';
import { useEffect, useState } from "react"

const url = "/api/top-sales";

const TopSalers = () => {
    const [catalogItems, setCatalogItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCatalogItems(data);
                setLoaded(true);
            });
    }, []);

    if (catalogItems.length === 0) {
        return(<></>);
    }

    return (
        <section class="top-sales">
            <h2 class="text-center">Хиты продаж!</h2>
            {!loaded &&
                <div class="preloader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            }
            {loaded &&
                <div class="row">
                    {catalogItems.map((item) => <CatalogItemCard key={item.id} obj={item} isCatalogItem={false} />)}
                </div>
            }
        </section>
    );
}

export default TopSalers;