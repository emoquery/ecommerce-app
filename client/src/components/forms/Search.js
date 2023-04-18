import axios from "axios";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className="nav-item">
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          type="text"
          style={{ borderRadius: "0px" }}
          className="form-control"
          placeholder="Search"
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          value={values.keyword}
        />
        <button className="btn btn-primary bg-black rounded-0" type="submit">
          Search
        </button>
      </form>
    </li>
  );
}
