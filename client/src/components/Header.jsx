import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const Logout = (e) => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Goal Setter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={Logout}>
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          <React.Fragment>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>

            <li>
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </header>
  );
}

export default Header;
