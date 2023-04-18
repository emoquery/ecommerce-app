import useCategory from "../hooks/useCategory";
import Jumbotron from "../components/cards/Jumbotron";
import { Link } from "react-router-dom";

export default function CategoriesList() {
  const categories = useCategory();

  return (
    <>
      <Jumbotron title="Categories" subTitle="List of all categories" />;
      <div className="container overflow-hidden">
        <div className="row gx-5 gy-5 mt-3 mb-5">
          {categories?.map((c) => (
            <div className="col-md-6" key={c._id}>
              <button className="btn btn-light text-dark col-12 p-3">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/category/${c.slug}`}
                >
                  {c.name}
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}