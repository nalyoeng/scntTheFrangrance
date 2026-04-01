import React, { useState } from "react";
import "./payments.css";
import ac from '../assets/ac.png'
import paypal from '../assets/paypal.png'
import aba from '../assets/aba.png'

function Checkout() {
  const [cart, setCart] = useState([
    { id: 1, name: "Luna Bloom", price: 10, oldPrice: 20, qty: 1, img: ac },
    { id: 2, name: "Luna Bloom", price: 10, oldPrice: 20, qty: 1, img: ac }
  ]);

  const [selectedPayment, setSelectedPayment] = useState('aba');

  // Increase quantity
  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  // Remove item
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Remove all
  const removeAll = () => {
    setCart([]);
  };

  // Total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="checkout-container">

      {/* ITEMS */}
      <div className="left">
        <div className="items-box">
            <div className="items-header">
            <h2>Items</h2>
            <span className="remove-all" onClick={removeAll}>Remove All</span>
            </div>

            {cart.length === 0 ? (
            <p className="empty">Cart is empty</p>
            ) : (
            cart.map(item => (
                <div className="item-card" key={item.id}>
                <img src={item.img} alt="product" />

                <div className="item-info">
                    <h4 className="item-title">{item.name}</h4>

                    <div className="price">
                    <span className="new-price">US$ {item.price}</span>
                    <span className="old-price">US${item.oldPrice}</span>
                    </div>

                    <div className="quantity">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                </div>

                <span className="remove" onClick={() => removeItem(item.id)}>X</span>
                </div>
            ))
            )}
        </div>

        {/* SUMMARY */}
        <div className="summary-box">
            <h2>Order Summary</h2>

            <div className="summary-row">
            <span>Subtotal</span>
            <span>${total}</span>
            </div>

            <div className="summary-row">
            <span>Discount</span>
            <span>$0</span>
            </div>

            <div className="summary-row">
            <span>Shipping</span>
            <span>FREE</span>
            </div>

            <hr />

            <div className="total">
            <span>Total Price</span>
            <span>${total}</span>
            </div>
        </div>
    </div>

    <div className="right">
        {/* RIGHT SIDE */}
        <h2>Checkout</h2>

        <div className='payment-methods'>
            <img 
              src={aba} 
              alt="ABA" 
              className={selectedPayment === 'aba' ? 'active' : ''}
              onClick={() => setSelectedPayment('aba')}
            />
            <img 
              src={paypal} 
              alt="PayPal" 
              className={selectedPayment === 'paypal' ? 'active' : ''}
              onClick={() => setSelectedPayment('paypal')}
            />
            <img 
              src={ac} 
              alt="AC" 
              className={selectedPayment === 'ac' ? 'active' : ''}
              onClick={() => setSelectedPayment('ac')}
            />
        </div>

        <div className='input'>
            <label>Cardholder name</label>
            <input type="text" />
        </div>

        <div className='input'>
            <label>Card number</label>
            <input type="text" />
        </div>

        <div className='row'>
            <div className='input'>
                <label>Expiration date</label>
                <input type="text" />
            </div>

            <div className='input'>
                <label>CVC</label>
                <input type="text" />
            </div>
        </div>
        <button className='pay-btn'>Payment</button>
    </div>
    </div>
  );
}

export default Checkout;
