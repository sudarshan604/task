import React from "react";
import UserTable from "@/components/users/user-table";
import { Layout } from "antd";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin | user table",
  description: "user table list",
};
const Home = () => {
  return (
    <Layout>
      <UserTable />;
    </Layout>
  );
};

export default Home;
