
import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "./storage";

export default function Admin() {

  const initialFormState = {
  brand: "",
  name: "",
  price: "",
  fragrance: "",
  img: "",
  discount: "",
  quantity: "",   // NEW
  description: "",
  ingredients: ""
};


  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const refresh = () => setProducts(getProducts());

  const handleSubmit = () => {
    const productData = {
      ...form,
      price: Number(form.price),
      discount: form.discount ? Number(form.discount) : null,
      ingredients: form.ingredients
        ? form.ingredients.split(",").map((i) => i.trim())
        : []
    };

    if (editingId) {
      updateProduct(editingId, productData);
      setEditingId(null);
    } else {
      addProduct(productData);
    }

    setForm(initialFormState);
    setShowForm(false);
    refresh();
  };

  const handleEdit = (p) => {
    setForm({
      ...p,
      ingredients: p.ingredients ? p.ingredients.join(", ") : ""
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      {/* Toggle button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-6"
        >
          Add Product
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {["brand","name","price","fragrance","img","discount","quantity","description","ingredients"].map((field) => (
                <input
                  key={field}
                  className="border p-2 rounded"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                />
              ))}

          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {editingId ? "Update Product" : "Save Product"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm(initialFormState);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      <hr className="my-6" />
      <h3 className="text-xl font-semibold mb-4">Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((p) => (
          <div key={p.id} className="relative bg-gray-100 p-4 rounded shadow">
            {p.img && (
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-60 object-cover rounded mb-2"
              />
              
            )}
             {p.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {p.discount}% OFF
                </div>
              )}
            {/* Out of Stock / In Stock badge */}
            <div className="absolute  bg-gray-600 text-white text-xs px-2 py-1  ml-60 rounded">
              {p.quantity > 0 ? `In Stock: ${p.quantity}` : "Out of Stock"}
            </div>
            <h4 className="font-bold mt-2">{p.name}</h4>
            <p className="text-sm text-gray-600">ID: {p.id}</p>
            <p className="text-sm text-gray-600">{p.brand}</p>
            <p className="text-sm text-gray-500">${p.price}</p>
            <p className="text-sm text-gray-400">{p.fragrance}</p>
            
            {p.description && (
              <p className="text-sm text-gray-500">{p.description}</p>
            )}
            {p.ingredients && p.ingredients.length > 0 && (
              <p className="text-xs text-gray-400">
                Ingredients: {p.ingredients.join(", ")}
              </p>
            )}

            <div className="flex  px-2 py-1 gap-2 mt-10">
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deleteProduct(p.id);
                  refresh();
                }}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
