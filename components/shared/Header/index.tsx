"use client";
import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import type { GetProp, MenuProps } from "antd";
type MenuItem = GetProp<MenuProps, "items">[number];

const Header = () => {
  const { Header: AntHeader } = Layout;

  const items: MenuItem[] = [
    {
      key: "1",
      label: <Link href="/">Task 1</Link>,
    },
    {
      key: "2",
      label: <Link href="/userlist">Task 2</Link>,
    },
  ];

  return (
    <AntHeader
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{
          flex: 1,
          maxWidth: 1440,
          margin: "0 auto",
          //   backgroundColor: "red",
        }}
      />
    </AntHeader>
  );
};

export default Header;
