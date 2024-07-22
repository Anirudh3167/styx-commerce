import { Link } from "react-router-dom";
import Logo from "../Logo/Logo"

import styles from './Footer.module.css';

export default function Footer() {
    const footerLinks = {"Contact Us": "#","About Us": "#","Privacy": "#","Terms": "#"};
    return (
        <div className={styles.FooterContainer}>
            <div className={styles.leftSection}>
                <Logo />
                <div className={styles.FooterDescription}>
                    Welcome to Styx commerce, and end to end e-commerce solution specialized for you.
                </div>
            </div>
            <div className={styles.rightSection}>
                {Object.keys(footerLinks).map((key, idx) => 
                    <Link to={footerLinks[key]} key={idx} className={styles.FooterLink}>  {key}     </Link>
                )}
            </div>
        </div>
    )
}