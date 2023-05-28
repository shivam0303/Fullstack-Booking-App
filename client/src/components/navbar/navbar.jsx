import { useContext } from "react";
import "./navbar.css"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

  const {user} = useContext(AuthContext);

  console.log(user);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
          <span className="logo">Booking</span>
        </Link>
        {
          user ? user.others.username : <div className="navItem">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
          }
      </div>
    </div>
  )
}

export default Navbar