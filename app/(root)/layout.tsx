import Header from "@/components/shared/Header";
import { Layout } from "antd";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const LayoutStyle: React.CSSProperties = {
    maxWidth: "1440px",
    margin: "0 auto",
  };

  return (
    <>
      <Header />
      <Layout style={LayoutStyle}>{children}</Layout>
    </>
  );
};

export default layout;
