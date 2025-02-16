import ProductTableWrapper from "@/components/ProductTableWrapper";
import type { Metadata } from "next";
import { auth } from "@/auth";
import AddProductButton from "@/components/AddProductButton";

export const metadata: Metadata = {
  title: "Product",
};
const ProductPage = async () => {
  const session = await auth();
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-screen-md mx-auto py-10">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Product List</h1>
          {session?.user && <AddProductButton />}
        </div>
        <ProductTableWrapper />
      </div>
    </div>
  );
};

export default ProductPage;
