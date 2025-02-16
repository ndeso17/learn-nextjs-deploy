"use client";
import { useState } from "react";
import { handleAddProduct } from "@/lib/handle";

const AddProductButton = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Aktifkan loading
    try {
      await handleAddProduct({ name, price: Number(price) });
      closeModal(); // Reset form & tutup modal
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false); // Matikan loading setelah selesai
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setName("");
    setPrice("");
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        + Tambah Produk
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-3">Tambah Produk</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <input
                type="text"
                placeholder="Nama Produk"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
                required
                disabled={loading}
              />
              <input
                type="number"
                placeholder="Harga Produk"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-2 rounded"
                required
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-green-500 text-white py-2 rounded-md flex items-center justify-center"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-400 text-white py-2 rounded-md"
                disabled={loading}
              >
                Batal
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductButton;
