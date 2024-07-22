import { useEffect } from "react";
import { useToast } from "../components/Toaster/ToastContext";
import ProductListData from "../database/productsList";

import styles from './Products.module.css'
import ProductCard from "../components/ProductCard/ProductCard";

export default function Products() {
    const toast = useToast();

    // Load stats from local storage
    useEffect(()=>{},[]);
    return(
        <div className={styles.ProductsContainer}>
        {ProductListData().products.map((product, idx) => <ProductCard key={idx} productDetails={product}/>)}
        </div>
    )
}