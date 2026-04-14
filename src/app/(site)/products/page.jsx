import {
  getAllProductsAction,
  getProductCategoriesAction,
} from "@/action/product.action";
import ShopCardComponent from "../../../components/shop/ShopCardComponent";
import React from "react";

export default async function Page() {
  const products = await getAllProductsAction();
  console.log("Product page : ", products);
  const categories = await getProductCategoriesAction();
  return (
    <div>
      <ShopCardComponent products={products} categories={categories} />
    </div>
  );
}
