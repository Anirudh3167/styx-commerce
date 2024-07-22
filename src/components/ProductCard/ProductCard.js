import { useEffect, useState } from 'react';
import styles from './ProductCard.module.css'
import { useToast } from '../Toaster/ToastContext';
export default function ProductCard({productDetails, showQuantity, onUpdateQuantity}) {
    const [addedToCart, setAddedToCart] = useState(false);
    const [qtyValue, setQtyValue] = useState(productDetails.quantitySelected);
    const toast = useToast();
    const getCartItems = () => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems && cartItems !== "[]" && cartItems !== "")
            return JSON.parse(cartItems);
        return [];                
    }
    useEffect(()=>{
        // Check the local storage and update it
        const cartItems = getCartItems();
        setAddedToCart(cartItems.includes(productDetails.id.toString()));
    },[]);
    const addItemToCart = (id) => {
        const cartItems = getCartItems();
        let idx = cartItems.indexOf(id);
        // Add Item to cart. If added then remove
        if (addedToCart) cartItems.splice(idx, 1);
        else cartItems.push(id);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        toast(productDetails.name + ` is ${!addedToCart ? "added" : "removed"} item to cart`);
        setAddedToCart(!addedToCart);
    }
    const updateQuantityValue = (id, value) => {
        if (value < 0) {
            toast("Quantity cannot be negative");
            return;
        }
        if (value > productDetails.quantity) {
            toast( "We only have " + productDetails.quantity + " items of " + productDetails.name);
            return;
        }
        setQtyValue(value);
        onUpdateQuantity(id, value);
    }
    return(
        <div className={styles.productCard} style={showQuantity ? {height:"360px"} : {}}>
            <div className={styles.productImage}>Image here</div>
            <div className={styles.productDetails}>
                <div className={styles.productName}>{productDetails.name}</div>
                <div style={{display:"flex",alignItems:"flex-start",flexDirection:"column"}}>
                    <label style={{fontSize:"12px"}}>Price : </label>
                    <div className={styles.productPrice}>{productDetails.price}</div>
                </div>
                {showQuantity &&
                    <div className={styles.productQty}>
                        <label style={{fontSize:"12px"}}>Quantity : </label>
                        <div className={styles.productQtyInput}>
                            {onUpdateQuantity &&
                                <div className={styles.productQtyBtn} style={{borderRight:"none"}}
                                onClick={()=>{updateQuantityValue(productDetails.id, productDetails.quantitySelected+1)}}> 
                                + </div>}
                            
                            <input type="number" min="0" max={productDetails.quantity}  className={styles.productQtyInputBox}
                            value = {qtyValue} disabled={onUpdateQuantity ? false : true} style={onUpdateQuantity ? {} : {border:"none",fontSize:"16px",background:"transparent"}}
                            onChange={(e)=>{updateQuantityValue(productDetails.id, e.target.value)}} />
                            
                            {onUpdateQuantity && 
                                <div className={styles.productQtyBtn} style={{borderLeft:"none"}}
                                onClick={()=>{updateQuantityValue(productDetails.id, productDetails.quantitySelected-1)}}> 
                                - </div>}
                        </div>
                    </div>
                }
            </div>
            <div className={styles.productButtons}>
                <div className={styles.productButton} onClick={() => addItemToCart(productDetails.id)}
                style={addedToCart ? {backgroundColor:"rgba(210,10,10,0.8)"} : {}}>
                    {addedToCart ? "Remove from Cart" : "Add to Cart"} </div>
            </div>
        </div>
    )
}