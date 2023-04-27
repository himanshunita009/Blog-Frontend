import './footer.css';
const Footer = ({text}) => {
    return ( 
        <div className="footer-main">
            <span className="footer-text">{text}</span>
        </div>
     );
}
 
export default Footer;