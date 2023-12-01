import './button.css';
const Button = ({text,handleButtonClick}) => {
    return ( 
        <span className="button-back" onClick={handleButtonClick}>
            <span className="button-text">{text}</span>
        </span>
     );
}
 
export default Button;