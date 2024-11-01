import "./style.css";
import Button from "../Button/index.jsx";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="navbar-h1">Sales Management</h1>
      <Button child="Logout"></Button>
    </div>
  );
};

export default Navbar;
