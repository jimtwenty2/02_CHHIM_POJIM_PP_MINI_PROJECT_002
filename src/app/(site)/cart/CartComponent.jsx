"use client";

import { useTransition } from "react";
import { useCartStore } from "@/app/store/useCartStore";
import { safeImage } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { createOrderAction } from "@/action/order.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CartComponent({ userId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (!userId) {
      toast.error("Please log in to checkout");
      return router.push("/login");
    }

    if (cart.length === 0) return;

    startTransition(async () => {
      try {
        const result = await createOrderAction(cart, userId);

        if (result.success) {
          toast.success("Order placed successfully!");
          clearCart();
          router.push("/orders");
        } else {
          toast.error(result.error || "Failed to place order");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    });
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center font-sans">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link href="/products" className="mt-4 text-lime-600 underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 font-sans">
      <h1 className="text-3xl font-bold mb-8">Your cart</h1>

      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div
            key={`${item.productId}-${item.color}-${item.size}`}
            className="flex items-center justify-between rounded-[1.5rem] border border-gray-100 p-5 bg-white shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-gray-50 flex-shrink-0">
                <Image
                  src={safeImage(item.imageUrl)}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <p className="text-xs text-gray-400 capitalize">
                  {item.color} · {item.size}
                </p>
                <p className="mt-1 font-semibold text-sm">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center rounded-full border border-gray-100 bg-gray-50 p-1">
                <button
                  disabled={isPending}
                  onClick={() => addToCart({ ...item, quantity: -1 })}
                  className="px-3 py-1 text-gray-400 hover:text-black disabled:opacity-30"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold text-sm">
                  {item.quantity}
                </span>
                <button
                  disabled={isPending}
                  onClick={() => addToCart({ ...item, quantity: 1 })}
                  className="px-3 py-1 text-gray-400 hover:text-black disabled:opacity-30"
                >
                  +
                </button>
              </div>
              <p className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                disabled={isPending}
                onClick={() =>
                  removeFromCart(item.productId, item.color, item.size)
                }
                className="text-xs text-red-500 hover:underline font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="rounded-[2rem] border border-gray-100 p-8 shadow-sm bg-white">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500 font-medium">Subtotal</span>
          <span className="text-2xl font-black">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onPress={handleCheckout}
            isLoading={isPending}
            className="w-full bg-[#1e293b] text-white font-bold py-8 rounded-2xl text-lg transition-transform active:scale-95"
          >
            Confirm & Checkout
          </Button>

          <Button
            onPress={clearCart}
            variant="light"
            disabled={isPending}
            className="w-full text-gray-400 font-medium py-6 rounded-2xl bg-gray-50 hover:bg-gray-100"
          >
            Clear cart
          </Button>
        </div>
      </div>
    </div>
  );
}
