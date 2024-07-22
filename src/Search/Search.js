import ProductCard from "../components/ProductCard/ProductCard";
import ProductListData from "../database/productsList";
import Slider from "react-slider";
import styles from './Search.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { MdClose, MdFilterList } from "react-icons/md";
import { useEffect, useState } from "react";
import { useToast } from "../components/Toaster/ToastContext";
export default function SearchResults() {
    const { query } = useParams();
    const [products,setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [filterOpen, setFilterOpen] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const updateSearchPreferences = () => {
        localStorage.setItem("searchPreferences", JSON.stringify(priceRange));
        toast("Search Preferences Updated");
        const filteredProducts = products.filter(product => {
            const price = parseInt(product.price.slice(1)); // Assuming price is stored as a number
            return price >= priceRange[0] && price <= priceRange[1];
        });
        setProducts((filteredProducts));
    }

    const resetSearchPreferences = () => {
        setPriceRange([0, 10000]);
        localStorage.setItem("searchPreferences", JSON.stringify([0, 10000]));
        setProducts(ProductListData().products.filter(product => {
            const { name, description, categories } = product;
            return (
                name.toLowerCase().includes(query.toLowerCase()) ||
                description.toLowerCase().includes(query.toLowerCase()) ||
                categories.some(category => category.toLowerCase().includes(query.toLowerCase()))
            );
        }));        
    }

    useEffect(()=>{
        if (query && query !== "") 
            setProducts(ProductListData().products.filter(product => {
                const { name, description, categories } = product;
                return (
                    name.toLowerCase().includes(query.toLowerCase()) ||
                    description.toLowerCase().includes(query.toLowerCase()) ||
                    categories.some(category => category.toLowerCase().includes(query.toLowerCase()))
                );
        }));
        let prevPriceRanges = localStorage.getItem("searchPreferences");
        if (prevPriceRanges && prevPriceRanges !== "" && prevPriceRanges !== "[]") {
            setPriceRange(JSON.parse(prevPriceRanges));
        }
    },[]);
    if (!query || query === "") return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
            <h1>Try searching something</h1>
        </div>
    );
    return (
        <div className={styles.ResultsWrapper}>
            {/* Filter Options */}
            <div className={styles.FilterContainer}>
                {/* Open and Close Filter */}
                <div className={styles.FilterHeader} onClick={() => setFilterOpen(!filterOpen)}> 
                    {filterOpen ? <MdClose /> : <MdFilterList /> }
                    {filterOpen ? "Close Filter" : "Filter"}
                </div>
                <div className={styles.FilterBody} style={filterOpen ? {display: "flex"} : {display: "none"}}>
                    <div className={styles.FilterLabel}>Price Range</div>
                    <Slider
                    min={0}
                    max={10000}
                    value={priceRange}
                    onChange={setPriceRange}
                    minDistance={50}
                    className={styles.slider} // Apply custom styles if needed
                    renderThumb={(props, state) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,height: "20px",width: "20px",backgroundColor: "grey",
                                borderRadius: "50%",top: "-5px", outline: "none",
                            }}
                        ></div>
                    )}
                />
                    <div className={styles.PriceRange}>
                        <span>${"min: " + priceRange[0]}</span>
                        <span>${"max: " + priceRange[1]}</span>
                    </div>
                    <div className={styles.FilterButton} onClick={()=>{updateSearchPreferences()}}>Save</div>
                    <div className={styles.FilterButton} style={{backgroundColor:"red"}} onClick={()=>{resetSearchPreferences()}}>Reset</div>
                </div>
            </div>
            <div className={styles.ResultsContainer}>
                {products.length > 0 ? 
                    products.map((product, idx) => <ProductCard key={idx} productDetails={product} />)
                :
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
                    <h1>No results found</h1>
                </div>
                }
            </div>
        </div>
    );
}
