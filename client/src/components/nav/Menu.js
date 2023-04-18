import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

export default function Menu() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const categories = useCategory();
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    setCart([]);
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <>
      <ul className="nav d-flex justify-content-center shadow-sm mb-2 sticky-top bg-light">
        <Search />

        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">
            HOME
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/shop">
            SHOP
          </NavLink>
        </li>

        <div className="nav-item me-auto">
          <div className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                CATEGORIES
              </a>

              <ul
                className="dropdown-menu"
                style={{ height: "300px", overflow: "scroll" }}
              >
                <li>
                  <NavLink className="nav-link" to={`/categories`}>
                    All Categories
                  </NavLink>
                </li>

                {categories?.map((c) => (
                  <li key={c._id}>
                    <NavLink className="nav-link" to={`/category/${c.slug}`}>
                      {c.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </div>
        </div>

        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/cart">
            CART
          </NavLink>
        </li>

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name?.toUpperCase()}
              </a>

              <ul className="dropdown-menu">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
}
