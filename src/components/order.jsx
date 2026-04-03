import React, { useState, useEffect } from "react";
import "./cart.css";
import ac from "../assets/ac.png";


function Cart() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? JSON.parse(savedItems) : [
      { id: 1, name: "Luna Bloom", price: 10, qty: 1, selected: false },
      { id: 2, name: "Luna Bloom", price: 10, qty: 1, selected: false },
      { id: 3, name: "Luna Bloom", price: 10, qty: 1, selected: false },
    ];
  });

  const [nextId, setNextId] = useState(() => {
    const savedNextId = localStorage.getItem("nextId");
    return savedNextId ? parseInt(savedNextId) : 4;
  });

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  // Save nextId to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("nextId", nextId.toString());
  }, [nextId]);


  const toggleSelect = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const selectAll = () => {
    const allSelected = items.every(item => item.selected);
    setItems(items.map(item => ({ ...item, selected: !allSelected })));
  };

  const changeQty = (id, type) => {
    setItems(items.map(item => {
      if (item.id === id) {
        if (type === "inc") return { ...item, qty: item.qty + 1 };
        if (type === "dec" && item.qty > 1) return { ...item, qty: item.qty - 1 };
      }
      return item;
    }));
  };

  const allSelected = items.every(item => item.selected) && items.length > 0;
  const total = items
    .filter(i => i.selected)
    .reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="cart-container">

      {/* ITEMS */}
      <div className="cart-list">
        {items.map(item => (
          <div className="cart-item" key={item.id}>

            <input
              type="checkbox"
              checked={item.selected}
              onChange={() => toggleSelect(item.id)}
            />

             <img src={ac} alt="product" /> 

            <div className="info">
              <h4>{item.name}</h4>
              <p>
                A soft floral fragrance that captures elegance, confidence, and
                everyday beauty.
              </p>
              <strong>US$ {item.price}</strong>
            </div>

            <div className="qty">
              <button onClick={() => changeQty(item.id, "dec")}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => changeQty(item.id, "inc")}>+</button>
            </div>

          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="cart-footer">
        <div className="left">
          <input 
            type="checkbox" 
            checked={allSelected}
            onChange={selectAll}
          />
          <span>All</span>
        </div>

        <div className="right">
          <strong>${total.toFixed(2)}</strong>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>

      

    </div>
  );
}

export default Cart;