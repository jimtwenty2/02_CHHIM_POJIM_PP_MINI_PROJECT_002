"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { safeImage } from "@/lib/image";
import Image from "next/image";
import StarRatingComponent from "./StarRatingComponent";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/useCartStore";
import { toast } from "sonner";

export default function ProductDetailComponent({
  product,
  products = [],
  headers,
}) {
  const [showSuccess, setShowSuccess] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  
  const onAddToCart = () => {
    const cartItem = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    };

    addToCart(cartItem);
    toast.success(`Product added to cart!`);
    setShowSuccess(true);
  };

  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || "",
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    setQuantity(1);
    setSelectedColor(product?.colors?.[0] || "");
    setSelectedSize(product?.sizes?.[0] || "");
  }, [product]);

  if (!product)
    return <div className="p-20 text-center font-sans">Product not found</div>;

  const gallery = [product.imageUrl];

  const currentIndex = products.findIndex(
    (p) => p.productId === product.productId,
  );
  const prevProduct = products[currentIndex - 1];
  const nextProduct = products[currentIndex + 1];

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 font-sans text-gray-900">
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-black transition">
          Products
        </Link>
        <span>/</span>
        <span className="font-medium text-black bg-gray-100 px-3 py-1 rounded-lg">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex flex-col">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner">
            <Image
              src={safeImage(gallery[activeIndex])}
              alt={product.name}
              fill
              priority
              className="object-contain p-12 transition-all duration-500 "
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="flex items-center justify-between w-full max-w-md gap-4">
              <button
                disabled={!prevProduct}
                onClick={() =>
                  router.push(`/products/${prevProduct?.productId}`)
                }
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:border-blue-500 disabled:opacity-20 transition active:scale-90"
              >
                <svg
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-4">
                <div
                  className={`relative h-16 w-16 opacity-80 transition-all duration-500 rounded-xl overflow-hidden border border-gray-100 ${prevProduct ? "cursor-pointer hover:opacity-100 hover:blur-0" : "invisible"}`}
                  onClick={() =>
                    prevProduct &&
                    router.push(`/products/${prevProduct.productId}`)
                  }
                >
                  {prevProduct && (
                    <Image
                      src={safeImage(prevProduct.imageUrl)}
                      alt="Previous Product"
                      fill
                      className="object-contain p-2 rounded-2xl"
                    />
                  )}
                </div>

                <div className="relative h-24 w-24 border-2 border-blue-600 rounded-2xl p-2 bg-white shadow-xl scale-110 transition-all duration-500">
                  <Image
                    src={safeImage(gallery[activeIndex])}
                    alt="current"
                    fill
                    className="object-contain p-1 rounded-2xl"
                  />
                </div>

                <div
                  className={`relative h-16 w-16 opacity-80 transition-all duration-500 rounded-xl overflow-hidden border border-gray-100 ${nextProduct ? "cursor-pointer hover:opacity-100 hover:blur-0" : "invisible"}`}
                  onClick={() =>
                    nextProduct &&
                    router.push(`/products/${nextProduct.productId}`)
                  }
                >
                  {nextProduct && (
                    <Image
                      src={safeImage(nextProduct.imageUrl)}
                      alt="Next Product"
                      fill
                      className="object-contain p-2 rounded-2xl"
                    />
                  )}
                </div>
              </div>

              <button
                disabled={!nextProduct}
                onClick={() =>
                  router.push(`/products/${nextProduct?.productId}`)
                }
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:border-blue-500 disabled:opacity-20 transition active:scale-90"
              >
                <svg
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-start gap-10 mb-4">
            <h1 className="text-4xl font-extrabold tracking-tight">
              {product.name}
            </h1>
            <StarRatingComponent
              productId={product.productId}
              initialRating={product.star}
              headers={headers}
            />
          </div>

          <div className="mb-8 flex items-center gap-4">
            <span className="text-3xl font-bold text-[#1a3a8a]">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-lg text-gray-400 line-through">$114.00</span>
          </div>

          <div className="mb-6">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide">
              Choose a color
            </p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c) => {
                const isSelected = selectedColor === c;
                const isWhite = c.toLowerCase() === "white";

                return (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{
                      backgroundColor: isSelected ? c.toLowerCase() : "white",
                      borderColor: isSelected 
                        ? (isWhite ? "#d1d5db" : `color-mix(in srgb, ${c.toLowerCase()}, black 20%)`) 
                        : "#f3f4f6",
                    }}
                    className={`rounded-full border-4 px-6 py-2 text-sm font-bold transition-all active:scale-95 ${
                      isSelected
                        ? isWhite 
                          ? "text-black shadow-md" 
                          : "text-white shadow-md"
                        : "text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            {selectedColor && (
              <p className="mt-5 text-sm text-gray-500">
                Selected: <span className="text-gray-600">{selectedColor}</span>
              </p>
            )}
          </div>

          <div className="mb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide">
              Choose a size
            </p>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`flex items-center gap-2 rounded-full border px-6 py-2 text-sm font-bold transition-all active:scale-95 ${
                    selectedSize === s
                      ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/20"
                      : "border-gray-100 bg-white text-gray-400 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${selectedSize === s ? "bg-blue-600" : "bg-gray-200"}`}
                  />
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-gray-500">
            {product.description}
          </p>
          {showSuccess && (
            <div className="mb-4 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2">
                <p>
                  Added to cart —{" "}
                  <Link
                    href="/cart"
                    className="font-bold underline decoration-emerald-300 hover:text-emerald-900 transition-colors"
                  >
                    view cart
                  </Link>
                </p>
              </div>
            </div>
          )}

          <div className="w-80 mb-10 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 p-1 shadow-inner">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 text-xl text-gray-400 hover:text-black transition-colors"
              >
                −
              </button>
              <span className="w-10 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10 text-xl text-gray-400 hover:text-black transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={onAddToCart}
              className="flex-1 rounded-full bg-[#12193e] px-6 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#1c265a] active:scale-95"
            >
              🛍️ Add to cart
            </button>
          </div>

          <div className="flex items-center gap-5 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900">Free 30-day returns</p>
              <p className="text-sm text-gray-400">
                See return policy details in cart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}