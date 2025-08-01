import React from 'react';
import CatalogItemCard from './CatalogItemCard';
import { useEffect, useState } from "react"


const TopSalers = () => {
    const [catalogItems, setCatalogItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const url = "http://localhost:7070/api/top-sales";

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCatalogItems(data);
                setLoaded(true);
            });
    }, []);

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