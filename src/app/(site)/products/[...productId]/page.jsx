import {
  getAllProductsAction,
  getProductByIdAction,
} from "@/action/product.action";
import ProductDetailComponent from "@/components/ProductDetailComponent";
import headerToken from "@/lib/headerToken";
export default async function ProductPage({ params }) {
  const { productId } = await params;

  const headers = await headerToken();

  const product = await getProductByIdAction(productId);
  const products = await getAllProductsAction();

  return (
    <ProductDetailComponent
      product={product}
      headers={headers}
      products={products}
    />
  );
}
