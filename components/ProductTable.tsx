"use client";

import { useState } from "react";
import { handleRemoveById } from "@/lib/handle";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import EditProductModal from "./EditProductModal";
import { formatDate } from "../lib/formatDate";
import { confirmDelete } from "@/components/ConfirmDialog";

interface Product {
  id: string;
  name: string;
  price: number;
  createdAt: string;
  user?: {
    name: string | null;
  };
}

interface ProductValueEdit {
  id: string;
  name: string;
  price: number;
}

const ProductTable = ({ products }: { products: Product[] }) => {
  const [editingProduct, setEditingProduct] = useState<ProductValueEdit | null>(
    null
  );

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirmDelete();
    if (isConfirmed) {
      await handleRemoveById(id);
    }
  };

  return (
    <>
      <table className="w-full bg-white mt-3 border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left text-sm">Name</th>
            <th className="py-3 px-6 text-left text-sm">Harga</th>
            <th className="py-3 px-6 text-left text-sm">Created At</th>
            <th className="py-3 px-6 text-left text-sm">Created By</th>
            <th className="py-3 px-6 text-left text-sm">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 px-6">{product.name}</td>
              <td className="py-3 px-6">
                Rp {product.price.toLocaleString("id-ID")}
              </td>

              <td className="py-3 px-6">{formatDate(product.createdAt)}</td>

              <td className="py-3 px-6">{product.user?.name || "Unknown"}</td>
              <td className="py-3 px-6 flex space-x-3">
                <FaEdit
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                  onClick={() => setEditingProduct(product)}
                />
                <FaRegTrashAlt
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </>
  );
};

export default ProductTable;
