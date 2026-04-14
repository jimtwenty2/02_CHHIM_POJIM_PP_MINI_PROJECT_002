import { auth } from "@/auth";
import CartComponent from "./CartComponent";

export default async function CartPage() {
  const session = await auth();
  return <CartComponent userId={session?.user?.id} />;
}
