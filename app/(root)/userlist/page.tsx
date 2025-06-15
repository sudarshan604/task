import React from "react";
import UserList from "@/components/users/user-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "random user",
  description: "random user list",
};

const Home = () => {
  return <UserList />;
};

export default Home;
