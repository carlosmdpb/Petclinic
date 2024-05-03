import React, { useState } from 'react';
//sin USAR, solo mockeado y falta conectar
const App = () => {
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const handlePayment = () => {
    setTimeout(() => {
      setPaymentProcessed(true);// Simulate successful payment
    }, 1000);
  };

  const applyDiscountCode = () => {
    setTimeout(() => {
      if (discountCode === 'DISCOUNT2023') {  // Simulate discount code verification
        setDiscountApplied(true);
      }
    }, 1000);
  };

  return (
    <div>
      <h1>Plan Payment</h1>
      {!paymentProcessed ? (
        <button onClick={handlePayment}>Pay for Plan</button>
      ) : (
        <p>Payment processed successfully!</p>
      )}

      <h1>Discount Code</h1>
      <input
        type="text"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
      />
      <button onClick={applyDiscountCode}>Apply Discount</button>
      {discountApplied && <p>Discount applied!</p>}
    </div>
  );
};

export default paymentAPI;