import "./style.css";

const Button = ({ child, onClick, className }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {child}
    </button>
  );
};

export default Button;
