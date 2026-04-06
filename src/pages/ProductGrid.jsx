import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getProducts } from "./storage";

export const products = getProducts();

export default function ProductGrid() {
  const navigate = useNavigate();

  // Slideshow state
  const promoImages = ["/pic020.jpg", "/pic001.jpg", "/pic021.jpg", "/pic023.jpg"];
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Local brands
  const localBrands = [
    { name: "The LAB", img: "/brands/thelab.jpg" },
    { name: "Amber", img: "/brands/amber.jpg" },
    { name: "mera", img: "/brands/mera.jpg" },
    { name: "ROMYANA", img: "/brands/romyana.jpg" },
    { name: "TARO", img: "/brands/taro.jpg" },
    { name: "AKA.BT", img: "/brands/aka_bt.jpg" },
    { name: "BOSBA SCENT", img: "/brands/bosba_scent.jpg" },
    { name: "OF YOUTH OF MAY", img: "/brands/youth.jpg" },
    { name: "MOUNTAINS AND RAIN", img: "/brands/mountain.jpg" }
  ];

  // Pagination state
  const [page, setPage] = useState(1);
  const productsPerPage = 20;

  // Filter state
  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [fragranceFilter, setFragranceFilter] = useState("");

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [brandFilter, priceFilter, fragranceFilter]);

  // Apply filters
  const filteredProducts = products.filter((p) => {
    const brandMatch = brandFilter ? p.brand === brandFilter : true;
    const priceMatch = priceFilter ? p.price <= Number(priceFilter) : true;
    const fragranceMatch = fragranceFilter ? p.fragrance === fragranceFilter : true;
    return brandMatch && priceMatch && fragranceMatch;
  });

  // Pagination based on filtered list
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    // min-h-screen ensures the page can grow longer than the viewport
    <div className="min-h-screen h-[100vh] pt-[10vh] pb-20">
      {/* Intro */}
      <div className="text-center max-w-full mx-auto mt-5 mb-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Scnt Perfume</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Trusted by thousands of fragrance lovers, our platform offers a diverse
          selection of authentic perfumes with a high customer satisfaction rate.
        </p>

        <div className="flex justify-center gap-4 md:gap-6 mt-4">
          <div className="bg-white px-4 py-2 rounded-full shadow text-sm">
            ⭐ 95%
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow text-sm">
            ❤️ 3000
          </div>
        </div>
      </div>

      {/* Filters - flex-wrap allows them to stack on small screens */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 px-4">
        <select
          className="border rounded p-2 cursor-pointer text-sm w-[45%] md:w-auto"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          <option value="">Filter by Brand</option>
          <option value="Amber">Amber</option>
          <option value="mera">mera</option>
          <option value="The LAB">The LAB</option>
          <option value="MOUNTAINS AND RAIN">MOUNTAINS AND RAIN</option>
          <option value="OF YOUTH OF MAY">OF YOUTH OF MAY</option>
          <option value="BOSBA SCENT">BOSBA SCENT</option>
          <option value="AKA.BT">AKA.BT</option>
          <option value="TARO">TARO</option>
          <option value="ROMYANA">ROMYANA</option>
        </select>

        <select
          className="border rounded p-2 cursor-pointer text-sm w-[45%] md:w-auto"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">Filter by Price</option>
          <option value="50">Under $50</option>
          <option value="100">Under $100</option>
          <option value="150">Under $150</option>
          <option value="250">Under $250</option>
        </select>

        <select
          className="border rounded p-2 cursor-pointer text-sm w-full md:w-auto"
          value={fragranceFilter}
          onChange={(e) => setFragranceFilter(e.target.value)}
        >
          <option value="">Filter by Fragrance</option>
          <option value="Woody">Woody</option>
          <option value="Floral">Floral</option>
          <option value="Fresh">Fresh</option>
          <option value="Oriental">Oriental</option>
          <option value="Citrus">Citrus</option>
        </select>
      </div>
      
      {/* Local Brands - improved grid scaling */}
      <h2 className="text-center text-xl md:text-2xl font-semibold mb-6">Local Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto mb-12 px-4">
        {localBrands.map((brand) => (
          <div
            key={brand.name}
            onClick={() => setBrandFilter(brand.name)}
            className="bg-white rounded-lg shadow hover:shadow-lg cursor-pointer flex flex-col items-center justify-center p-4 md:p-6 transition-transform active:scale-95"
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="w-16 md:w-20 h-16 md:h-20 object-contain mb-3" 
            />
            <p className="font-semibold text-xs md:text-base text-center">{brand.name}</p>
          </div>
        ))}
      </div>

      {/* Promo Slideshow */}
      <h2 className="text-center text-xl md:text-2xl font-semibold mb-6">DON'T MISS OUT!</h2>
      <div className="max-w-5xl mx-auto mb-6 px-4">
        <img
          src={promoImages[promoIndex]}
          alt="promo"
          className="w-full h-48 sm:h-80 md:h-[500px] object-cover rounded shadow transition-opacity duration-500"
        />
      </div>
      <div className="flex justify-center gap-2 mt-2 mb-12">
        {promoImages.map((_, i) => (
          <span
            key={i}
            onClick={() => setPromoIndex(i)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer ${
              promoIndex === i ? "bg-black" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 max-w-6xl mx-auto mt-4 px-4">
        {currentProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="bg-white rounded shadow hover:shadow-xl transition cursor-pointer flex flex-col"
          >
            <div className="relative">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-40 md:h-50 object-cover rounded-t-md"
              />
              {p.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] md:text-xs px-2 py-1 rounded font-bold">
                  {p.discount}% OFF
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-gray-900/70 text-white text-[10px] px-2 py-1 rounded">
                   {p.quantity > 0 ? `Stock: ${p.quantity}` : "Out of Stock"}
              </div>
            </div>
            <div className="p-3 md:p-4 flex-grow">
                <h3 className="font-semibold text-sm md:text-base line-clamp-1">{p.name}</h3>
                <p className="text-xs text-gray-500">{p.brand}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{p.fragrance}</p>

                {p.discount ? (
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 line-through">${p.price}</p>
                    <p className="text-base md:text-lg font-bold text-red-600">
                      ${ (p.price * (1 - p.discount / 100)).toFixed(2) }
                    </p>
                  </div>
                ) : (
                  <p className="text-base md:text-lg font-bold mt-2">${p.price}</p>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-12 px-4">
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full cursor-pointer transition-colors ${
                page === i + 1 ? "bg-black" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
        <div className="ml-4 border px-3 py-1 rounded bg-white text-sm font-medium">
          {page} / {totalPages}
        </div>
      </div>
    </div>
  );
}