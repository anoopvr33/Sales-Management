import "../../components/Header/style.css";
import "../../components/ItemDetails/style.css";
import Navbar from "../../components/Navbar/index.jsx";
import AddedItem from "../../components/AddedItems/index.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Button from "../../components/Button/index.jsx";
import { toast } from "react-toastify";
import "./style.css";

const socket = io.connect("http://localhost:4400");

const SalesManage = () => {
  const [data, setData] = useState({});
  const [item, setItems] = useState({});
  const [recieved, setIt] = useState([]);

  const OnHeader = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const OnDetails = (e) => {
    setItems({ ...item, [e.target.name]: e.target.value });
  };

  const OnAdd = async () => {
    if (
      !item.itemno ||
      !item.code?.trim() ||
      !item.rate ||
      !item.name ||
      !item.quantity
    ) {
      return toast.error("fill all field");
    } else {
      setItems({ itemno: "", name: "", code: "", rate: "", quantity: "" });
      await socket.emit("send_message", item);
    }
  };

  const OnSave = async () => {
    if (
      !data.number ||
      !data.date ||
      !data.status ||
      !data.name ||
      !data.amount
    ) {
      return toast.error("please fill all field in Header");
    }
    await axios.post("http://localhost:4400/array/array/details", {
      head: [data],
      detail: [recieved],
    });

    toast.success("Successfully saved");
  };

  useEffect(() => {
    socket.on("receive_message", (dat) => {
      setIt([...recieved, dat]);
    });
  }, [recieved]);

  return (
    <div className="sale-manage">
      <Navbar></Navbar>
      <div className="container">
        {/* ///////////////  Header  ////////// */}

        <div className="header-1">
          <h1>Header</h1>
          <div className="input-field-1">
            <input
              name="number"
              type="text"
              onChange={OnHeader}
              placeholder="Mob No."
            />
            <input
              name="date"
              type="date"
              onChange={OnHeader}
              placeholder="Date"
            />
            <input
              name="status"
              type="text"
              onChange={OnHeader}
              placeholder="Status"
            />
            <input
              name="name"
              type="text"
              onChange={OnHeader}
              placeholder="Ac.Name"
            />
            <input
              name="amount"
              type="text"
              onChange={OnHeader}
              placeholder="Ac.Amount"
            />
          </div>
        </div>

        {/* //////////////   Details   /////////// */}

        <div className="details-1">
          <h1>Details</h1>
          <div className="input-field-2">
            <input
              value={item.itemno}
              onChange={OnDetails}
              type="number"
              name="itemno"
              placeholder="Item No."
            />
            <input
              value={item.code}
              onChange={OnDetails}
              type="text"
              name="code"
              placeholder="Item code"
            />
            <input
              value={item.name}
              onChange={OnDetails}
              type="text"
              name="name"
              placeholder="Item Name"
            />
            <input
              value={item.rate}
              onChange={OnDetails}
              type="text"
              name="rate"
              placeholder="Rate"
            />
            <input
              value={item.quantity}
              onChange={OnDetails}
              type="text"
              name="quantity"
              placeholder="Quantity"
            />
          </div>
          <Button
            child="Add"
            onClick={OnAdd}
            className="detail-button-1"
          ></Button>
        </div>
      </div>

      {/* ////////// Added Items   //////// */}

      <div className="display-items-1">
        <h1>Added items</h1>

        <h3>
          <AddedItem socket={socket}></AddedItem>
        </h3>
      </div>

      {/* ////////// Acitivty Buttons  /////////// */}

      <div className="activities">
        <Button
          child="New"
          onClick={() =>
            window.setTimeout(function () {
              window.location.reload();
            })
          }
        ></Button>
        <Button onClick={OnSave} child="Save"></Button>
        <Button onClick={() => window.print()} child="print"></Button>
      </div>
    </div>
  );
};

export default SalesManage;
