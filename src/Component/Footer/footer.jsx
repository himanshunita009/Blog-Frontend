import './footer.css';
import React from "react";
const Footer = ({text}) => {
    return ( 
        <div className="footer-main">
            <span className="footer-text">{text}</span>
        </div>
     );
}
 
export default Footer;