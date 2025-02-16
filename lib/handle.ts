"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth"; // Sesuaikan dengan konfigurasi auth kamu

export async function handleEditById(
  id: string,
  newData: { name: string; price: number }
) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const userRole = session.user.role; // Pastikan role ada di session

  try {
    // Jika user adalah admin, bisa edit semua data
    if (userRole === "admin") {
      await prisma.product.update({
        where: { id },
        data: newData,
      });
    } else {
      // User biasa hanya bisa edit data miliknya sendiri
      const product = await prisma.product.findUnique({
        where: { id },
        select: { userId: true },
      });

      if (!product || product.userId !== userId) {
        throw new Error("Forbidden: You can only edit your own products.");
      }

      await prisma.product.update({
        where: { id, userId },
        data: newData,
      });
    }

    revalidatePath("/product");
  } catch (error) {
    console.error("Edit Error:", error);
    throw new Error("Failed to edit product");
  }
}

export async function handleRemoveById(id: string) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const userRole = session.user.role;

  try {
    if (userRole === "admin") {
      await prisma.product.delete({
        where: { id },
      });
    } else {
      const product = await prisma.product.findUnique({
        where: { id },
        select: { userId: true },
      });

      if (!product || product.userId !== userId) {
        throw new Error("Forbidden: You can only delete your own products.");
      }

      await prisma.product.delete({
        where: { id, userId },
      });
    }

    revalidatePath("/product");
  } catch (error) {
    console.error("Delete Error:", error);
    throw new Error("Failed to delete product");
  }
}

export async function handleAddProduct(data: { name: string; price: number }) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized"); // Cek apakah user login
  }

  try {
    await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        userId: session.user.id, // Simpan berdasarkan user yang login
      },
    });

    revalidatePath("/product"); // Refresh halaman product
  } catch (error) {
    console.error("Add Product Error:", error);
    throw new Error("Failed to add product");
  }
}

export async function handleDeleteUser(id: string) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "admin") {
    throw new Error("Forbidden"); // Hanya admin yang boleh menghapus user
  }

  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/user"); // Refresh daftar user setelah penghapusan
  } catch (error) {
    console.error("Delete Error:", error);
    throw new Error("Failed to delete user");
  }
}
