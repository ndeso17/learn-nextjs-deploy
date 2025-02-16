import { GetProducts } from "@/lib/data";
import ProductTable from "./ProductTable";

const ProductTableWrapper = async () => {
  const products = (await GetProducts()) || [];
  const formattedProducts = products.map((product) => ({
    ...product,
    createdAt:
      product.createdAt instanceof Date
        ? product.createdAt.toISOString()
        : product.createdAt,
  }));

  return <ProductTable products={formattedProducts} />;
};

export default ProductTableWrapper;
