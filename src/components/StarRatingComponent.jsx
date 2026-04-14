"use client";

import React, { useState } from "react";
export default function StarRatingComponent({
  productId,
  initialRating = 0,
  headers,
}) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const handleAutoUpdate = async (count) => {
    const previousRating = rating;
    setRating(count);
    setIsUpdating(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}/rating?star=${count}`,
        {
          method: "PATCH",
          headers,
        },
      );
      if (!response.ok) throw new Error("Update failed");
      console.log(`Product ${productId} successfully rated ${count} stars`);
    } catch (error) {
      console.error("Rating Error:", error);
      setRating(previousRating);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className="flex items-center gap-1 group">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          disabled={isUpdating}
          onClick={() => handleAutoUpdate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={`text-3xl transition-all duration-150 transform active:scale-90 ${
            isUpdating
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:scale-110"
          }`}
        >
          <span
            className={`${
              star <= (hover || rating) ? "text-amber-400" : "text-gray-200"
            }`}
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
}
