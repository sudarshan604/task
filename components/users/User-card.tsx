"use client";
import React from "react";
import { Avatar, Card, Typography } from "antd";
import { RandomUserSchema } from "@/lib/validators/user-schema";
import { UserOutlined } from "@ant-design/icons";
const UserCard = ({ data }: { data: RandomUserSchema }) => {
  return (
    <Card
      hoverable
      style={{
        width: 300,
        margin: "16px",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Avatar
        size={64}
        src={data.picture.medium}
        icon={!data.picture.medium && <UserOutlined />}
        style={{ marginBottom: "16px" }}
      />
      <Typography.Title level={4} style={{ margin: 0 }}>
        {data.name.first + " " + data.name.last}{" "}
      </Typography.Title>
      <Typography.Text
        type="secondary"
        style={{ display: "block", margin: "8px 0" }}
      >
        {data.email}
      </Typography.Text>
      <Typography.Text style={{ textTransform: "capitalize" }}>
        {data.gender}
      </Typography.Text>
    </Card>
  );
};

export default UserCard;
