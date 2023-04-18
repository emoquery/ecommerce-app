import { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";

export default function CategoryView() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.slug) loadProductsByCategory();
  }, [params.slug]);

  const loadProductsByCategory = async () => {
    try {
      const { data } = await axios.get(`/products-by-category/${params.slug}`);
      setProducts(data.products);
      setCategory(data.category);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={category?.name}
        subTitle={`${products?.length} products found in "${category?.name}"`}
      />

      <div className="container-fluid">
        <div className="row mt-3">
          {products?.map((p) => (
            <div key={p._id} className="col-md-2">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
