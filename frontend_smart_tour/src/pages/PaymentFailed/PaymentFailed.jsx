import React from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from "../../components/Header/Header";
import './PaymentFailed.css'

function PaymentFailed() {
    return (
        <div>
            <Navbar />
            <div className='PaymentFailedPage'>
                <h1>Payment Failed</h1>
                <p>We're sorry, but your payment could not be processed at this time.</p>
            </div>
            <Footer />
        </div>
    );
}

export default PaymentFailed;
