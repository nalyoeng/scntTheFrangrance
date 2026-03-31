
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getProducts } from "./storage";
import Header from "../components/Header";
export const products = getProducts();




export default function ProductGrid() {
  const navigate = useNavigate();
  // lets you move between pages when clicking a product.
  // Promo slideshow state
  const promoImages = ["/pic020.jpg", "/pic001.jpg", "/pic021.jpg", "/pic023.jpg"];
  const [promoIndex, setPromoIndex] = useState(0);
  useEffect(() => {
  //  setInterval browser function that repeats code every X milliseconds.
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoImages.length);
    }, 2000); // change every 2 seconds
    return () => clearInterval(interval);
  }, []);
  // for local brand name
  const localBrands = ["The LAB", "Amber", "mera", "ROMYANA", "TARO"];

  // Pagination state
  const [page, setPage] = useState(1);
  const productsPerPage = 10; // how many products per page
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Slice products for current page
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="h-[100vh] pt-[10vh]">
      <Header/>
      {/* Intro */}
      <div className="text-center max-w-full mx-auto mt-5 mb-10">
        <h1 className="text-4xl font-bold mb-3">Scnt Perfume</h1>
        <p className="text-gray-600">
          Trusted by thousands of fragrance lovers, our platform offers a diverse
          selection of authentic perfumes with a high customer satisfaction rate.
        </p>

        <div className="flex justify-center gap-6 mt-4">
          <div className="bg-white px-4 py-2 rounded-full shadow">
            ⭐ 95%
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow">
            ❤️ 3000
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-10 ">
        <select className="border rounded p-2 cursor-pointer">
          <option>Filter by Brand</option>
          <option>Amber</option>
          <option>mera</option>
          <option>The LAB</option>
        </select>

        <select className="border rounded p-2 cursor-pointer">
          <option>Filter by Price</option>
          <option>Under $100</option>
          <option>Under $150</option>
        </select>

        <select className="border rounded p-2 cursor-pointer">
          <option>Filter by Fragrance</option>
          <option>Woody</option>
          <option>Floral</option>
          <option>Fresh</option>
        </select>
      </div>

      {/* Local Brands */}
      <h2 className="text-center text-2xl font-semibold mb-6">Local Brands</h2>
      <div className="grid md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-12">
        {localBrands.map((brand) => (
          <div
            key={brand}
            className="bg-white rounded-lg shadow flex items-center justify-center h-18 text-center hover:shadow-lg cursor-pointer "
          >
            <p className="font-semibold">{brand}</p>
          </div>
        ))}
      </div>


      {/* Promo Slideshow */}
      <h2 className="text-center text-2xl font-semibold mb-6">DON'T MISS OUT!</h2>
        <div className="max-w-4xl mx-auto mb-12">
          <img
            src={promoImages[promoIndex]}
            alt="promo"
            className="w-full h-120 object-cover rounded shadow transition-opacity duration-500"
          />
        </div>
        <div className="flex justify-center gap-2 mt-2">
          {promoImages.map((_, i) => (
            <span
              key={i}
              onClick={() => setPromoIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                promoIndex === i ? "bg-black" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>




      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto mt-4">
        {currentProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="bg-white rounded shadow hover:shadow-xl transition cursor-pointer"
          >
          <div className="relative">
              <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-32 object-cover rounded-t-md"
                />


              {p.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {p.discount}% OFF
                </div>
              )}
              
                <div className="absolute bottom-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded">
                     {p.quantity >0 ? `In Stock: ${p.quantity}` : "Out of Stock"}
                </div>
            
          </div>
          <div className="p-4">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.brand}</p>
              <p className="text-sm text-gray-400">{p.fragrance}</p>

              {p.discount ? (
                <div className="mt-2">
                  {/* Original price crossed out */}
                  <p className="text-sm text-gray-500 line-through">${p.price}</p>
                  {/* Discounted price */}
                  <p className="text-lg font-bold text-red-600">
                    ${ (p.price * (1 - p.discount / 100)).toFixed(2) }
                  </p>
                </div>
              ) : (
                <p className="text-lg font-bold mt-2">${p.price}</p>
              )}
          </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10">
        {[...Array(totalPages)].map((items, i) => (
          <span
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              page === i + 1 ? "bg-black" : "bg-gray-400"
            }`}
          ></span>
        ))}
        <div className="ml-4 border px-3 py-1 rounded bg-white">
          {page} / {totalPages}
        </div>
      </div>
    </div>
  );
}
