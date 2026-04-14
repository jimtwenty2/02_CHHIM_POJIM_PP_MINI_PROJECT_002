"use client";

import React, { useState, useEffect } from "react";
import ProductCardComponent from "@/components/ProductCardComponent";
import CreateProductModal from "@/components/CreateProductModalComponent";
import EditProductModal from "@/components/EditProductModalComponent";
import { getAllProductsAction } from "@/action/product.action";
import DeleteProductModal from "@/components/DeleteProductModalComponent";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("name-az");
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteInitiated = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        setIsLoading(true);
        const data = await getAllProductsAction();
        if (data) setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  // Open the Edit Modal and set the specific product data
  const handleEditInitiated = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.productId !== id));
  };

  const sortedProducts = [...products].sort((a, b) => {
    const nameA = (a.name || a.productName || "").toLowerCase();
    const nameB = (b.name || b.productName || "").toLowerCase();
    return sortBy === "name-az" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 font-sans text-gray-900">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Manage Products</h1>
          <p className="mt-2 text-gray-500 text-sm">Update or remove items from your store inventory.</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-48 rounded-full border border-gray-200 bg-gray-50 px-5 py-2.5 text-sm font-bold shadow-sm"
          >
            <option value="name-az">Name (A-Z)</option>
            <option value="name-za">Name (Z-A)</option>
          </select>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">Products</h2>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 rounded-full bg-[#a3ff12] px-6 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-[#92e610]"
          >
            <span>+</span> Create product
          </button>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-100 border-t-[#a3ff12]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCardComponent
                key={product.productId}
                product={product}
                isManagePage={true}
                onDelete={() => handleDeleteInitiated(product)}
                onEdit={() => handleEditInitiated(product)} 
              />
            ))}
          </div>
        )}
      </div>

      <CreateProductModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
      />

      <EditProductModal 
        isOpen={isEditOpen} 
        onClose={() => {
          setIsEditOpen(false);
          setSelectedProduct(null); 
        }} 
        product={selectedProduct} 
      />

      <DeleteProductModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />
    </div>
  );
}