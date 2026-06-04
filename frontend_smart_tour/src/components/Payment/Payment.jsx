import React, { useState } from "react";
import axios from "axios";


const PaymentForm = () => {
  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      headers: { "Content-Type": "Application/json" },
      url: "http://localhost:3002/api/users/verifypayment",
      data: inputs
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: '25%', margin: '0 auto' }}>
      <label style={{ margin: "10px 0" }}>
        <span>Name:</span><br />
        <input
          name="name"
          type="text"
          value={inputs.name}
          onChange={handleChange}
          style={{ width: '100%', padding: "5px", margin: "10px 0" }}
        />
      </label>
      <label style={{ margin: "10px 0" }}>
        <span>Card Number:</span><br />
        <input
          type="text"
          name="card_number"
          value={inputs.card_number}
          onChange={handleChange}
          style={{ width: '100%', padding: "5px", margin: "10px 0" }}
        />
      </label>
      <label style={{ margin: "10px 0" }}>
        <span>Expiry Date:</span><br />
        <input
          type="text"
          name="expiry_date"
          value={inputs.expiry_date}
          onChange={handleChange}
          style={{ width: '100%', padding: "5px", margin: "10px 0" }}
        />
      </label>
      <label style={{ margin: "10px 0" }}>
        <span>Security Code:</span><br />
        <input
          type="text"
          name="security_code"
          value={inputs.security_code}
          onChange={handleChange}
          style={{ width: '100%', padding: "5px", margin: "10px 0" }}
        />
      </label>
      <button type="submit" style={{ padding: "10px", margin: "10px 0" }}>Submit Payment</button>
    </form>
  );
};

export default PaymentForm;