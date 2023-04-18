import { useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";

export default function ProductCard({ p }) {
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  return (
    <div className="card mb-2 hoverable">
      <Badge.Ribbon
        text={`${p?.quantity >= 1 ? "In stock" : "Out of stock"}`}
        color="black"
      >
        <img
          className="card-img-top"
          src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
          alt={p.name}
          style={{ height: "400px", objectFit: "cover" }}
        />
      </Badge.Ribbon>

      <div className="card-body">
        <h5>{p?.name}</h5>

        <h4 className="fw-fold">
          {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h4>

        <p className="card-text">{p?.description.substring(0, 150)}...</p>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary col card-button bg-black"
          style={{ borderBottomLeftRadius: "5px" }}
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          View Product
        </button>

        <button
          className="btn btn-outline-primary col card-button"
          style={{ borderBottomRightRadius: "5px" }}
          onClick={() => {
            setCart([...cart, p]);
            localStorage.setItem("cart", JSON.stringify([...cart, p]));
            toast.success(`Added "${p?.name}" to cart`);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
