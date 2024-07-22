import { useEffect, useState } from "react";
import { useToast } from "../components/Toaster/ToastContext";
import ProductListData from "../database/productsList";

import styles from './Cart.module.css';
import ProductCard from "../components/ProductCard/ProductCard";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
    const toast = useToast();
    const navigate = useNavigate();
    const getCartItems = () => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems && cartItems !== "[]" && cartItems !== "")
            return JSON.parse(cartItems);
        return [];                
    }

    const getOrderUID = () => { // Auto Increment to avoid duplicates
        const orderUID = localStorage.getItem("orderUID");
        if (orderUID && orderUID !== "")
            return parseInt(JSON.parse(orderUID)) + 1;
        return 0;                
    }

    let [cartItems, setCartItems] = useState([]);
    // Load items from local storage
    useEffect(() => {
        const cartItemIds = getCartItems();
        setCartItems(cartItemIds.map(id => ProductListData().products.find(product => product.id === id)));
    },[])

    const updateQty = (id, qty) => {
        console.log("Updating Qty", id, qty);
        // Save this new qty in local storage
        setCartItems(cartItems.map((item) => item.id === id ? { ...item, quantitySelected: qty } : item));
    }
    const createOrder = () => {
        if (cartItems.length === 0) {
            toast("Cart is empty");
            return;
        }
        // 1. Get the UID for this order
        const orderUID = getOrderUID();
        // 2. Save the order in local storage
        localStorage.setItem("order_" + orderUID,
            JSON.stringify({
                items : cartItems.filter(item => item.quantitySelected > 0)
                        .map(item => ({id : item.id, quantitySelected : item.quantitySelected})),
                totalPrice : cartItems.reduce((total, item) => total + parseInt(parseInt(item.price.slice(1)) * (item.quantitySelected) || 0),0),
                totalItems : cartItems.reduce((total, item) => total + parseInt(item.quantitySelected || 0), 0),
                date : new Date().toString(),
            }));
        // 3. Clear the cart
        setCartItems([]);
        localStorage.setItem("cartItems", JSON.stringify([]));
        toast("New Order created");
        // 4. Update the order UID
        localStorage.setItem("orderUID", JSON.stringify(orderUID + 1));
        // 5. Redirect to order page
        navigate(`/orders/${orderUID}`);
    }

    if (cartItems.length === 0) return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh",flexDirection:"column"}}>
            <h1>You have No Items in the Cart.</h1>
            <h1>Start Shopping with our 
                <Link to="/products" style={{color:"blue",textDecoration:"none",fontWeight:"bold",padding:"0 10px"}}>Products</Link>
            </h1>
        </div>
    );

    return(
        <div className={styles.CartContainer}>
            {/* Cart Items on Left */}
            <div className={styles.CartItemsContainer}>
            {cartItems.map((product, idx) => <ProductCard key={idx} productDetails={product} 
            onUpdateQuantity={updateQty} showQuantity={true} />)}
            </div>

            {/* Cart Summary on Right */}
            <div className={styles.CartSummaryContainer}>
                <div className={styles.CartItemCount}>
                    {"Total Items : \t"}
                    {cartItems.reduce((total, item) => total + parseInt(item.quantitySelected || 0), 0)}
                </div>
                <div className={styles.CartTotalPrice}>
                    {"Total Price : \t$"}
                    {cartItems.reduce((total, item) => total + parseInt(parseInt(item.price.slice(1)) * (item.quantitySelected) || 0),0)}
                </div>
                <div style={{width:"100%", background:"black",height:"2px",margin:"10px 0"}}></div> {/* Line */}
                <div className={styles.CartCheckoutButton} onClick={()=>{createOrder()}}>Checkout</div>
            </div>
        </div>
    )
}