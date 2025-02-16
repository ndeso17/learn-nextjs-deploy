"use client"; // Ini adalah Client Component

import { FaRegTrashAlt } from "react-icons/fa";
import { handleDeleteUser } from "@/lib/handle";
import { useState } from "react";
import {
  confirmDeleteUser,
  callbackConfirmDelete,
} from "@/components/ConfirmDialog";

interface User {
  id: string;
  name: string | null; // Allow null
  email: string | null; // Allow null
  emailVerified: Date | null; // Add this field
  image: string | null; // Add this field
  password: string | null; // Add this field
  role: string;
  gender: string; // Add this field
}

const UserTable = ({ users }: { users: User[] }) => {
  const [userList, setUserList] = useState(users);

  if (!userList.length) return <h1 className="text-2xl">No Users Found</h1>;

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirmDeleteUser();
    if (isConfirmed) {
      try {
        await handleDeleteUser(id);
        setUserList(userList.filter((user) => user.id !== id));
        await callbackConfirmDelete(true);
      } catch (error) {
        console.error("Delete Error:", error);
        await callbackConfirmDelete(false);
      }
    }
  };

  return (
    <table className="w-full bg-white mt-3">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Name</th>
          <th className="py-3 px-6 text-left text-sm">Email</th>
          <th className="py-3 px-6 text-left text-sm">Role</th>
          <th className="py-3 px-6 text-left text-sm">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => (
          <tr key={user.id}>
            <td className="py-3 px-6">{user.name || "Unknown"}</td>
            <td className="py-3 px-6">{user.email || "Unknown"}</td>
            <td className="py-3 px-6">{user.role}</td>
            <td className="py-3 px-6 flex space-x-3">
              <FaRegTrashAlt
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => handleDelete(user.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
