import React from 'react'
import './PaymentSuccess.css'
import { useSelector, useDispatch } from "react-redux";

function PaymentSuccess() {
  const cart = useSelector((state) => state.cart)
  return (
    <div className="PaymentSuccess">
      <div className="container">
        <h1>Payment Successful</h1>
        <div className="PaymentSuccessTemplate">
          <div className="PaymentSuccessAnimation"></div>
          <div className="PaymentSuccessReceipt">
            <h4>Transaction Number: 12314564</h4>
            <div className="AmountSuccess">
              <table>
                <tr>
                  <th>Location:</th>
                  <th>Hotel:</th>
                  <th>Amount Paid:</th>
                </tr>
                <tr>
                  <td>Lahore</td>
                  <td>PC Hotel</td>
                  <td>{cart.cartTotalAmount}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess