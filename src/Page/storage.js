// storage.js

// Initialize products only once
export const initProducts = (initialProducts) => {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }
};

// Get all products
export const getProducts = () => {
  const data = localStorage.getItem("products");
  return data ? JSON.parse(data) : [];
};

export const addProduct = (product) => {
  const products = getProducts();
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const newProduct = { id: newId, ...product };
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
};


// Update product
export const updateProduct = (id, updated) => {
  const products = getProducts().map((p) =>
    p.id === id ? { ...p, ...updated } : p
  );
  localStorage.setItem("products", JSON.stringify(products));
};

// Delete product
export const deleteProduct = (id) => {
  const products = getProducts().filter((p) => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
};
