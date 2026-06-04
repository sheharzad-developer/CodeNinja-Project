import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import imageIslamabad from '../../assets/Islamabad-hotel.jpeg'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import { useNavigate } from "react-router-dom";
import { decreaseCart, emptyCart, increaseCart } from '../../redux/features/cartSlice'
import { Link } from "react-router-dom";
import axios from "axios";
import './Cart.css';

function Cart() {
  const cart = useSelector((state) => state.cart)
  console.log("cart console: ", cart)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const handleCheckout = async () => {
    console.log(cart.cartItems.name)
    try {
      const res = await axios.post('http://localhost:3002/api/stripe/checkoutsession',
        {
          customer_id: 1,
          order_total: cart.cartTotalAmount,
          booking_from: cart.dates[0].startDate,
          booking_to: cart.dates[0].endDate,
          rooms_booked: cart.cartTotalQuantity,
          hotel_id: cart.cartItems.id,
          name: cart.cartItems.name,
        }
      );
      window.location.href = res.data.url;
      // dispatch(emptyCart());
    }
    catch (error) {
      console.error(error);
      navigate("/paymet-failed")
    }
  }
  return (
    <div>
      <Header />
      {localStorage.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div style={styles.container}>
          <img src={imageIslamabad} style={styles.image} alt={"hotel image"} />
          <h3 style={styles.name}>{cart.cartItems.name}</h3>
          <div style={styles.details}>

            <p style={styles.price}>Price: PKR {cart.cartTotalAmount}</p>
            <div style={styles.quantityContainer}>
              <button
                onClick={() => { dispatch(decreaseCart()) }}
                style={styles.quantityButton}
              >
                -
              </button>
              <p style={styles.quantity}>{cart.cartTotalQuantity}</p>
              <button
                onClick={() => { dispatch(increaseCart()) }}
                style={styles.quantityButton}
              >
                +
              </button>
            </div>
            <div className="CartButton">
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      )
      }
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    margin: 20,
    border: "1px solid black",
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  name: {
    fontSize: 20,
    margin: 0,
  },
  price: {
    fontSize: 16,
    color: "gray",
    margin: 0,
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    cursor: "pointer",
  },
  quantity: {
    margin: 0,
    marginRight: 10,
    marginLeft: 10,
    fontSize: 18,
  },
};

export default Cart;