import React, { useState } from 'react';

const PaymentComponent = () => {
    const [paymentUrl, setPaymentUrl] = useState('');
    console.log(paymentUrl)
    const initiatePayment = async () => {
        try {
            // Make an API request to your server to initiate the payment
            const response = await fetch('http://localhost:8888/order/create_payment_url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Include any necessary data for the payment request
                    amount: 1000000, // Example amount
                    bankCode: 'INTCARD', // Example bank code
                    language: 'vn', // Example language
                    // Include other required data
                }),
            });

            const data = await response.json();

            // Update state with the payment URL
            setPaymentUrl(data.paymentUrl);

            // Redirect the user to the payment gateway
            window.location.href = data.paymentUrl;
        } catch (error) {
            console.error('Error initiating payment:', error);
            // Handle errors
        }
    };

    return (
        <div>
            {/* Your UI elements */}
            <button onClick={initiatePayment}>Initiate Payment</button>

            {/* Display payment details for debugging purposes */}
            <div>
                <h2>Payment Details</h2>
                <p>Payment URL: {paymentUrl}</p>
            </div>
        </div>
    );
};

export default PaymentComponent;
