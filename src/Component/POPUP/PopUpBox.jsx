import { Link } from "react-router-dom";
import Button from "../UI Component/Button/button";
import "./PopUpBox.css";
const PopUpBox = ({heading,message,redirect,link,handleButtonClick}) => {
    return ( 
        <div className="pop-back">
            <span className="pop-dialog">
                <span className="popup-head">{heading}</span>
                <span className="message">{message}</span>
                {redirect && <Link to={link}>OK</Link>}
                {!redirect && <Button text={link} handleButtonClick={handleButtonClick} />}
            </span>
        </div>
     );
}
 
export default PopUpBox;