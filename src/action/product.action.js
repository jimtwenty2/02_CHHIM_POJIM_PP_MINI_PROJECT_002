"use server";
import { revalidateTag, revalidatePath } from "next/cache";
import {
  getProductCategoriesService,
  getProductsService,
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "@/service/product.service";
export async function getProductsAction(limit = 10) {
  try {
    const data = await getProductsService(limit);
    return data.payload;
  } catch (error) {
    console.error("Server Action Error:", error.message);
    return [];
  }
}

export async function getProductCategoriesAction() {
  try {
    const data = await getProductCategoriesService();
    return data.payload;
  } catch (error) {
    console.error("Categories Action Error:", error);
    return [];
  }
}

export async function getAllProductsAction() {
  try {
    const data = await getAllProductsService();
    return data.payload;
  } catch (error) {
    console.error("All Products Action Error:", error);
    return [];
  }
}

export async function getProductByIdAction(productId) {
  try {
    const data = await getProductByIdService(productId);
    return data.payload;
  } catch (error) {
    console.error("Product By ID Action Error:", error);
    return null;
  }
}

export async function createProductAction(productData) {
  try {
    const data = await createProductService(productData);
    revalidateTag("products");
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function updateProductAction(productId, productData) {
  try {
    const data = await updateProductService(productId, productData);
    revalidateTag("products");
    revalidatePath(`/products/${productId}`);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Update failed",
    };
  }
}

export async function deleteProductAction(productId) {
  try {
    await deleteProductService(productId);
    revalidateTag("products");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}
