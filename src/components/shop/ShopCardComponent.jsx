"use client";
import Link from "next/link";
import Image from "next/image";
import { StarRow } from "../ProductCardComponent";
import { useState } from "react";
import { safeImage } from "@/lib/image";

const categoryTone = {
  Skincare: "bg-sky-50 text-sky-800",
  Serum: "bg-violet-50 text-violet-800",
  Toner: "bg-amber-50 text-amber-900",
  Adapter: "bg-emerald-50 text-emerald-900",
};

function badgeClass(label) {
  return categoryTone[label] ?? "bg-indigo-50 text-indigo-800";
}

const btnClass =
  "mt-2 block w-full rounded-xl border border-gray-900 bg-gray-900 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gray-800 active:scale-95";

export default function ShopCardComponent({ products = [], categories = [] }) {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  const handleCategoryChange = (id) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const resetFilters = () => {
    setSearch("");
    setMaxPrice(2000);
    setSelectedCategoryIds([]);
  };
  const categoryMatchedProducts = products?.filter((product) => {
    return (
      selectedCategoryIds.length === 0 ||
      selectedCategoryIds.includes(product.categoryId)
    );
  });
  const filteredProducts = categoryMatchedProducts?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 font-sans text-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Luxury beauty products</h1>
          <p className="text-gray-500">
            Use the filters to narrow by price and brand.
          </p>
        </div>
        <input
          type="text"
          placeholder="Search by product name..."
          className="w-full md:w-80 rounded-lg border border-gray-200 px-4 py-3 outline-none ring-lime-400 focus:ring-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full lg:w-64">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-xs text-gray-400 underline underline-offset-4 transition-all duration-200 hover:text-blue-500 active:scale-95 active:text-blue-700 ease-in-out"
              >
                Reset filters
              </button>
            </div>

            <div className="mb-5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Price Range
              </label>
              <p className="my-2 font-medium text-sm">$0 — ${maxPrice}</p>
              <input
                type="range"
                min="0"
                max="2000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-100 accent-black"
                style={{
                  background: `linear-gradient(to right, black 0%, black ${(maxPrice / 2000) * 100}%, #f3f4f6 ${(maxPrice / 2000) * 100}%, #f3f4f6 100%)`,
                }}
              />
              <div className="flex justify-between mt-1 text-[10px] text-gray-300">
                <p>$0</p>
                <p>$2000</p>
              </div>
            </div>

            <div className="mb-5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Quick Select
              </label>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[50, 300, 500, 1000, 1999].map((p, index) => (
                  <button
                    key={index}
                    onClick={() => setMaxPrice(p)}
                    className={`rounded-xl border py-2.5 text-xs font-medium transition ${
                      maxPrice === p
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    Under ${p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Categories
              </label>
              <div className="mt-2 space-y-2">
                {categories?.map((cat) => {
                  const currentId = cat.categoryId;
                  const count = products?.filter(
                    (p) => String(p.categoryId) === String(currentId),
                  ).length;
                  return (
                    <label
                      key={currentId}
                      className="flex items-center justify-between cursor-pointer group hover:bg-gray-200 p-1 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCategoryIds.includes(currentId)}
                            onChange={() => handleCategoryChange(currentId)}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-black checked:border-black transition-all"
                          />
                          <svg
                            className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-[14px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    </label>
                  );
                })}
              </div>
              <p className="mt-6 text-[12px] text-gray-500 italic">
                Select none to include all categories.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <p className="mb-6 text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-black">
              {filteredProducts?.length} products
            </span>
            {/* The count now compares based on the current category context */}
            <span className="ml-1 text-gray-400">
              (of {categoryMatchedProducts?.length})
            </span>
          </p>

          {filteredProducts?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts?.map((product) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                  categories={categories}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-500 bg-white p-12 text-center">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">
                  No products match these filters
                </h3>
                <p className="text-gray-500">
                  Try raising the price limit or clearing search terms.
                </p>
              </div>

              <button
                onClick={resetFilters}
                className="mt-8 rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-95"
              >
                Reset all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ProductCard({ product, categories }) {
  const category = categories.find(
    (cat) => String(cat.categoryId) === String(product.categoryId),
  );
  const categoryName = category ? category.name : "Other";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={safeImage(product.imageUrl)}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-semibold leading-snug text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 min-h-10 line-clamp-2 text-sm leading-5 text-gray-500">
            {product.description}
          </p>
        </div>
        <StarRow rating={product.star} />
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
          <p className="text-xl font-semibold tabular-nums text-gray-900">
            ${product.price}
          </p>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass(
              categoryName,
            )}`}
          >
            {categoryName}
          </span>
        </div>
        <Link href={`/products/${product.productId}`} className={btnClass}>
          View Product
        </Link>
      </div>
    </article>
  );
}
