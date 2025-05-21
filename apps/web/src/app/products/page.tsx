// app/products/page.tsx
import React from "react";
import suit from "../../../public/suit.jpeg";
import Image from "next/image";

const categories = ["Accessories", "Bijoux", "Sacs", "Chaussures", "Montres"];

const brands = [
  "Louis Vuitton",
  "Gucci",
  "Hermès",
  "Prada",
  "Chanel",
  "Dior",
  "Yves Saint Laurent",
  "Bulgari",
  "Rolex",
  "Cartier",
];

const products = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  vendor: "Cartier",
  name: `Test Product ${i + 1}`,
  price: `${(50_000 + i * 5_000).toLocaleString()} MAD`,
  image: `https://via.placeholder.com/400x400?text=Product+${i + 1}`,
}));

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="sr-only">Products</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 space-y-8 mb-8 lg:mb-0">
          {/* Categories */}
          <section>
            <h2 className="font-semibold text-lg mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-black border-gray-300 rounded"
                  />
                  <span className="text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </section>
          {/* Brands */}
          <section>
            <h2 className="font-semibold text-lg mb-4">Brands</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-black border-gray-300 rounded"
                  />
                  <span className="text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </section>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{products.length}</span>{" "}
              products
            </p>
            <select className="border border-gray-300 rounded p-2">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col"
              >
                <Image
                  src={suit}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <span className="text-xs uppercase text-gray-500">
                  {p.vendor}
                </span>
                <h3 className="font-semibold text-lg mb-2">{p.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold">{p.price}</span>
                  {/* Simple chat icon */}
                  <button
                    aria-label="Chat with seller"
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h6m5 8l-5-5H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>
                </div>
                <button className="mt-auto w-full py-2 bg-black text-white rounded-lg uppercase text-sm">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
