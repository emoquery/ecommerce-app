import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import ProductCardHorizontal from "../../components/cards/ProductCardHorizontal";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

export default function AdminOrders() {
  const [auth, setAuth] = useAuth();

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changedStatus, setChangedStatus] = useState("");

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/all-orders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (orderId, value) => {
    setChangedStatus(value);
    try {
      const { data } = await axios.put(`/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="User dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>

            <div className="row">
              {orders?.map((o, i) => {
                return (
                  <div
                    key={o._id}
                    className="border shadow bg-light rounded-2 mb-2"
                  >
                    <table className="table table-fixed">
                      <thead>
                        <tr>
                          <th style={{ width: "5%" }} scope="col">
                            #
                          </th>
                          <th style={{ width: "20%" }} scope="col">
                            Status
                          </th>
                          <th style={{ width: "25%" }} scope="col">
                            Buyer
                          </th>
                          <th style={{ width: "20%" }} scope="col">
                            Ordered
                          </th>
                          <th style={{ width: "20%" }} scope="col">
                            Payment
                          </th>
                          <th style={{ width: "20%" }} scope="col">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Select
                              bordered={false}
                              className="p-1 mb-2"
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td>{o?.buyer?.email}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length} products</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="row m-1">
                      {o?.products?.map((p, i) => (
                        <ProductCardHorizontal key={i} p={p} remove={false} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
