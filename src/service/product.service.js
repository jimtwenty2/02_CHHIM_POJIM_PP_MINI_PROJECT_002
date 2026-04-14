import headerToken from "@/lib/headerToken";

export async function getProductsService(limit) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/products/top-selling?limit=${limit}`;
  const headers = await headerToken();
  const res = await fetch(url, {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data from API");
  }

  return res.json();
}

export async function getProductCategoriesService() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/categories`;
  const headers = await headerToken();
  const res = await fetch(url, {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data from API");
  }

  return res.json();
}
export async function getAllProductsService() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;
  const headers = await headerToken();
  const res = await fetch(url, {
    headers,
    next: {
      tags: ["products", "max"],
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data from API");
  }
  return res.json();
}

export async function getProductByIdService(productId) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`;
  const headers = await headerToken();
  const res = await fetch(url, {
    headers,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data from API");
  }
  return res.json();
}

export async function createProductService(productData) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;
  const headers = await headerToken();
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    throw new Error("Failed to create product");
  }
  return res.json();
}

export async function updateProductService(productId, productData) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`;
  const headers = await headerToken();
  const res = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function deleteProductService(productId) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`;
  const headers = await headerToken();
  const res = await fetch(url, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}
