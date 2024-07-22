import { useEffect, useState } from "react";
import { useToast } from "../components/Toaster/ToastContext";
import ProductListData from "../database/productsList";

import styles from '../Cart/Cart.module.css';
import ProductCard from "../components/ProductCard/ProductCard";
import { useNavigate, useParams } from "react-router-dom";

export default function OrderItem() {
    const toast = useToast();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [orderDate, setOrderDate] = useState("");
    const [orderItems, setOrderItems] = useState([]);
    const navigate = useNavigate();
    const { orderUID } = useParams();
    const getOrderItems = () => {
        if (!orderUID || orderUID === "") {
            navigate('/orders');
            return ;
        }
        const orderItems = localStorage.getItem("order_" + orderUID);
        if (orderItems && orderItems !== "[]" && orderItems !== "")
            return JSON.parse(orderItems);
        // Else case
        if (orderUID && orderUID !== "") {
            toast('Either this Order is invalid or Order ID not found');
            navigate('/');
        }
        return [];         
    }
    // Load items from local storage
    useEffect(() => {
        const orderItemIds = getOrderItems();
        if (!orderItemIds || orderItemIds.length === 0) return ;
        setOrderItems(orderItemIds.items.map(item => {
            const product = ProductListData().products.find(product => product.id === item.id);
            return {
                ...product,
                quantitySelected: item.quantitySelected ?? 1,
            };
        }));
        setOrderDate(orderItemIds.date);
        setTotalPrice(orderItemIds.totalPrice);
        setTotalItems(orderItemIds.totalItems);
    },[])
    return(
        <div className={styles.CartContainer}>
            {/* Cart Items on Left */}
            <div className={styles.CartItemsContainer}>
            {orderItems.map((product, idx) => <ProductCard key={idx} productDetails={product} 
            showQuantity={true} />)}
            </div>

            {/* Cart Summary on Right */}
            <div className={styles.CartSummaryContainer} style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly"}}>
                <h1 style={{textAlign: "center",width:"100%"}}> Order Summary </h1>
                <div className={styles.CartTotalPrice} style={{fontWeight:"600",fontSize:"16px"}}>
                    {"Order UID : \t" + orderUID}
                </div><div className={styles.CartTotalPrice} style={{fontWeight:"600",fontSize:"16px"}}>
                    {"Order Date : \t" + Date(orderDate).toString().slice(0,24)}
                </div>
                <div className={styles.CartItemCount} style={{fontWeight:"600",fontSize:"16px"}}>
                    {"Total Items : \t" + totalItems.toString()}
                </div>
                <div className={styles.CartTotalPrice} style={{fontWeight:"600",fontSize:"16px"}}>
                    {"Total Price : \t$" + totalPrice.toString()}
                </div>
            </div>
        </div>
    )
}