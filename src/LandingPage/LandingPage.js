import { useEffect } from "react"
import { useToast } from "../components/Toaster/ToastContext";

// Better to have some Landing Page

import styles from './LandingPage.module.css'
import ProductSlider from "../components/ProductSlider/ProductSlider";
import ProductListData from "../database/productsList";

export default function LandingPage() {
    const toast = useToast();
    return(
        <div className={styles.slidesContainer}>
            {/* Slide 1 (Intro) */}
            <div className={styles.slides} style={{backgroundColor:"rgba(60,60,60,0.8)",color:"white"}}>
                <div className={styles.borderLine}>
                    <div className={styles.IntroText}>
                        Welcome to Styx Commerce <br />
                        The Fastest Growing E-commerce Solution
                    </div>
                </div>
            </div>
            {/* Slide 2 (Featured Products) */}
            <div className={styles.slides} styles={{minHeight:"none"}}>
                <div className={styles.IntroText}> Featured Products </div>
                {/* <div className={styles.IntroText} style={{alignItems:"center",justifyContent:"center",height:"300px"}}> Coming Soon </div>
                 */}
                <ProductSlider products={ProductListData().products.slice(0,6)} />
            </div>
        </div>
    )
}