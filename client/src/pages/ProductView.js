import { useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";
import { Badge } from "antd";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";

export default function ProductView() {
  const [cart, setCart] = useCart();

  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProduct(params);
  }, [params?.slug]);

  const loadProduct = async (req, res) => {
    try {
      const { data } = await axios.get(`/product/${params?.slug}`);
      setProduct(data);
      loadRelated(data._id, data.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRelated = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `related-products/${productId}/${categoryId}`
      );
      setRelated(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <div className="card mb-2">
            <Badge.Ribbon
              text={`${product?.quantity >= 1 ? "In stock" : "Out of stock"}`}
              color="black"
            >
              <img
                className="card-img-top"
                src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                alt={product.name}
                style={{ height: "600px", width: "100%", objectFit: "cover" }}
              />
            </Badge.Ribbon>

            <div className="card-body">
              <h1 className="fw-bold">{product?.name}</h1>

              <p className="card-text">{product?.description}</p>
            </div>

            <div className="d-flex justify-content-between lead p-2 bg-light fw-bold">
              <div>
                <p>
                  <FaDollarSign /> Price:{" "}
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>

                <p>
                  <FaProjectDiagram /> Category: {product?.category?.name}
                </p>

                <p>
                  <FaRegClock /> Added: {moment(product.createdAt).fromNow()}
                </p>

                <p>
                  {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}{" "}
                  {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                </p>

                <p>
                  <FaWarehouse /> Available {product?.quantity - product?.sold}
                </p>

                <p>
                  <FaRocket /> Sold {product.sold}
                </p>
              </div>
            </div>

            <button
              className="btn btn-outline-primary col card-button"
              style={{ borderBottomRightRadius: "5px" }}
              onClick={() => {
                setCart([...cart, product]);
                toast.success(`Added "${product?.name}" to cart`);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="col-md-2">
          <h2>Related products</h2>
          <hr />
          {related?.length < 1 && <p>Nothing found</p>}
          {related?.map((p) => (
            <ProductCard p={p} key={p._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
