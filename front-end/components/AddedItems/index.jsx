import { useEffect, useState } from "react";
import "./style.css";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4400");

const AddedItem = () => {
  const [total, setTotal] = useState(0);
  const [receive, setReceive] = useState([]);

  useEffect(() => {
    ///////// receive item details  //////

    socket.on("receive_message", (dat) => {
      console.log("data recieved", dat);
      setReceive([...receive, dat]);
    });

    //////// calculate total amount /////

    const calculatedTotal = receive.reduce((acc, item) => {
      return acc + (item.rate * item.quantity || 0); // Fallback to 0 if undefined
    }, 0);
    setTotal(calculatedTotal);
  }, [receive]);

  return (
    <div className="added-item">
      <table border="">
        <tr>
          <th>SI No.</th>
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Rate</th>
          <th>Quantity</th>
          <th>Amount</th>
        </tr>

        {receive.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.itemno}</td>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.rate}</td>
              <td>{item.quantity}</td>
              <td>{item.rate * item.quantity}</td>
            </tr>
          );
        })}
      </table>
      <label htmlFor="" id="total">
        Total
        <input placeholder={total} type="text" id="total-input" />
      </label>
    </div>
  );
};

export default AddedItem;
