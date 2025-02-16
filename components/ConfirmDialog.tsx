"use client";
import Swal from "sweetalert2";

export const confirmDelete = async () => {
  const result = await Swal.fire({
    title: "Apakah kamu yakin?",
    text: "Produk yang dihapus tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
  });

  return result.isConfirmed;
};
export const confirmDeleteUser = async () => {
  const result = await Swal.fire({
    title: "Apakah kamu yakin?",
    text: "User yang dihapus tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
  });

  return result.isConfirmed;
};
export const callbackConfirmDelete = async (succes: boolean) => {
  if (succes) {
    return Swal.fire("Deleted!", "Data telah dihapus.", "success");
  } else {
    return Swal.fire("Error!", "Gagal menghapus data.", "error");
  }
};
