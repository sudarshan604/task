import { TableProps, Typography } from "antd";
import UserTableActions from "./action";
import React from "react";

export interface ColumnType {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export const columns: TableProps<ColumnType>["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },

  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "Email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "Phone",
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "Company",
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <UserTableActions record={record} />,
  },
];
