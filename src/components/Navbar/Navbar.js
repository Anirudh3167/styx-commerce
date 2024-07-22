// Styles not implemented
// Module css not working
// Hamburger Menu lines needs correction

import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Logo from "../Logo/Logo";

import styles from './Navbar.module.css';
import { useEffect, useState } from "react";
function HamburgerMenu({ navbarOpen, setNavbarOpen }) {
    return (
        <div className={`${styles.HamburgerMenu} ${navbarOpen ? styles.activeHamburger : ""}`} onClick={()=>setNavbarOpen(!navbarOpen)}>
            <div className={`${styles.HamburgerLine} ${styles.TopLine}`}></div>
            <div className={`${styles.HamburgerLine} ${styles.BottomLine}`}></div>
        </div>
    )
}

function SearchBar() {
    const navigate = useNavigate();
    return (
        <div className={styles.SearchBar}>
            <input type="text" placeholder="Search" className={styles.SearchBarInput} onChange={(e)=>{navigate(`/search/${e.target.value}`)}} />
        </div>
    )
}

export default function Navbar() {
    const navbarLinks = {"Home": "/",   "Products": "/products",    "Cart": "/cart", "Orders": "/orders"}
    const [navbarOpen, setNavbarOpen] = useState(true);

    // To get the original size after the hamburger menu is closed and squeezed back
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {setWindowWidth(window.innerWidth);};
        window.addEventListener('resize', handleResize);
        return () => {window.removeEventListener('resize', handleResize);};
    }, []);

    return (
        <div className={styles.NavbarContainer}>   {/* Fixed at Top */}
            <HamburgerMenu navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />   {/* small screens only */}

            <Link to={"/"} style={{textDecoration:"none",paddingTop:"5px"}}> <Logo /> </Link>

            <div className={styles.NavbarContent} 
                style={(windowWidth >= 600 || navbarOpen) ? {display: "flex"}: {display: "none"}}>     {/* small screens ? vertical : Horizontal */}
                <SearchBar />
                
                <div className={styles.NavbarLinksContainer}
                    style={(windowWidth >= 600 || navbarOpen) ? {display: "flex"}: {display: "none"}}>  {/* small screens ? vertical : Horizontal) */}
                    {Object.keys(navbarLinks).map((key,idx) => 
                        <Link to={navbarLinks[key]} className={styles.NavbarLinkItem} key={idx}>{key}</Link>
                    )}
                </div>
            </div>
        </div>
    )
}
