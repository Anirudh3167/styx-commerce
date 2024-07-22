import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductSlider.module.css';

export default function ProductSlider({products}) {
    return(
        <div className={styles.ProductsSliderContainer}>
            {products.map((product, idx) => <ProductCard key={idx} productDetails={product}/>)}
        </div>
    )
}