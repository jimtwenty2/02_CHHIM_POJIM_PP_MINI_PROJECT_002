"use client";

import Image from "next/image";
import Link from "next/link";
import ButtonAddComponent from "./ButtonAddComponent";
import { useState } from "react";
import { safeImage } from "@/lib/image";

export function StarRow({ rating = 0, size = "sm" }) {
  const numericRating = Math.min(5, Math.max(0, Number(rating)));
  const filledStars = Math.round(numericRating);
  const emptyStars = 5 - filledStars;

  const sizeClasses = size === "lg" ? "text-xl gap-1" : "text-sm gap-0.5";

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating: ${numericRating} out of 5 stars`}
    >
      <div className={`flex items-center text-amber-400 ${sizeClasses}`}>
        {[...Array(filledStars)].map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-200">
            ★
          </span>
        ))}
      </div>
      {size === "sm" && (
        <span className="ml-1 text-xs font-medium tabular-nums text-gray-500">
          {numericRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export default function ProductCardComponent({
  product,
  isManagePage = false,
  onDelete,
  onEdit, // Receive the prop
}) {
  const [showMenu, setShowMenu] = useState(false);
  const { productId, name, productName, price, imageUrl, star } = product;
  const displayName = name || productName;

  return (
    <article className="group relative flex flex-col rounded-[2rem] border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
      {isManagePage && (
        <div className="absolute right-6 top-6 z-20">
          <button
            onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm transition hover:border-gray-300 active:scale-90"
          >
            <span className="mb-2 text-xl font-bold text-gray-400">...</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-200">
              <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit(); // This opens the modal
                    setShowMenu(false);
                }}
                className="w-full rounded-xl px-4 py-2 text-left text-sm font-medium hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(productId);
                  setShowMenu(false);
                }}
                className="w-full rounded-xl px-4 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      <Link href={`/products/${productId}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-[1.8rem] bg-gray-50 flex items-center justify-center">
          <Image
            src={safeImage(imageUrl)}
            alt={displayName}
            fill
            className="object-contain p-10 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="mt-4 px-2 pb-2">
        <StarRow rating={star} />
        <Link href={`/products/${productId}`}>
          <h3 className="mt-1 line-clamp-1 text-lg font-extrabold text-gray-900">{displayName}</h3>
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-black text-gray-900">${price}</span>
          <ButtonAddComponent productId={productId} />
        </div>
      </div>

      {showMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
      )}
    </article>
  );
}