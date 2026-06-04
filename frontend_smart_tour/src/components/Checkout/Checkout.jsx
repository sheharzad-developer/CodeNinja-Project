import React, { useState } from "react";
import { loadStripe } from '@stripe/react-stripe-js';
import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe("your_stripe_public_key");

const CheckoutPage = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });

        if (!error) {
            console.log("[PaymentMethod]", paymentMethod);
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className="checkout-page">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"

                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="card-element">Credit or debit card</label>
                    <CardElement id="card-element" />
                </div>
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;