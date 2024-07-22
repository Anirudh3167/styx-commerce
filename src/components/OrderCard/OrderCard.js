import { Link } from 'react-router-dom'
import styles from '../ProductCard/ProductCard.module.css'

export default function OrderCard({orderDetails}) {
    return(
        <Link to={`/orders/${orderDetails.orderUID}`} className={styles.productCard} style={{textDecoration:"none",color:"black", height:"360px"}}>
            <div className={styles.productImage}>Image here</div>
            <div className={styles.productDetails}>
                <div className={styles.productName}>{"Order ID : " + orderDetails.orderUID}</div>
                <div style={{display:"flex",alignItems:"flex-start",flexDirection:"column"}}>
                    <label style={{fontSize:"12px"}}>Price : </label>
                    <div className={styles.productPrice}>{orderDetails.totalPrice}</div>
                </div>
                <div style={{display:"flex",alignItems:"flex-start",flexDirection:"column"}}>
                    <label style={{fontSize:"12px"}}>Qunatity : </label>
                    <div className={styles.productPrice}>{orderDetails.totalItems}</div>
                </div>
                <div style={{display:"flex",alignItems:"flex-start",flexDirection:"column"}}>
                    <label style={{fontSize:"12px"}}>Date : </label>
                    <div className={styles.productPrice}>{Date(orderDetails.date).slice(0,16)}</div>
                </div>
            </div>
        </Link>
    )
}