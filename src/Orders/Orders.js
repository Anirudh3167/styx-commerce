import { Link } from 'react-router-dom';
import styles from '../Cart/Cart.module.css';
import OrderCard from "../components/OrderCard/OrderCard";

export default function Orders() {
    // 1. Get all the UID's made
    const orders = Object.keys(localStorage).filter(key => key.includes("order_"))
        .map(orderID => {
            const storedData = localStorage.getItem(orderID); // Get the stored data for each order ID
            return storedData ? { orderUID : orderID.slice(6), ...JSON.parse(storedData) } : null; // Parse the data and return an object with orderID
        })
        .filter(order => order !== null);
    return (
        <div className={styles.CartContainer} style={{height:"fit-content"}}>
            {(orders && orders.length > 0) ?
                orders.map((item, idx) => <OrderCard key={idx} orderDetails={item} />)
            :
                <h1>You Have No Orders <br />
                     Start Shopping with our 
                     <Link to="/products" 
                        style={{color:"blue",textDecoration:"none",fontWeight:"bold",padding:"0 10px"}}>
                        Products</Link>
                </h1>
            } 
        </div>
    )
}