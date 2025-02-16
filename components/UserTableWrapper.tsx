"use server";

import { GetUsers } from "@/lib/data";
import UserTable from "@/components/UserTable";

const UserTableWrapper = async () => {
  const users = (await GetUsers()) || [];
  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    password: user.password,
    role: user.role,
    gender: user.gender,
  }));

  return <UserTable users={formattedUsers} />;
};

export default UserTableWrapper;
