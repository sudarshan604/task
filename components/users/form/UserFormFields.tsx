"use client";

import { type CreateUserSchema } from "../../../lib/validators/user-schema";
import { Form, Input, Space } from "antd";

export default function UserFormFields() {
  return (
    <>
      <Space direction="vertical" size={18} style={{ width: "100%" }}>
        <Form.Item<CreateUserSchema>
          name="name"
          label="Full Name"
          required
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Input user fullname" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<CreateUserSchema>
          name="email"
          label="Email Address"
          required
          rules={[
            {
              required: true,
            },
            {
              message: "Please enter valid Email Address",
            },
          ]}
        >
          <Input type="email" placeholder="Input email address" />
        </Form.Item>
        <Form.Item<CreateUserSchema>
          name="phone"
          label="Phone"
          required
          rules={[
            {
              required: true,
            },
            {
              message: "Please enter valid Phone number",
            },
          ]}
        >
          <Input type="phone" placeholder="Input Phone number" />
        </Form.Item>
        <Form.Item<CreateUserSchema>
          name="company"
          label="company"
          required
          rules={[
            {
              required: true,
            },
            {
              message: "Please enter valid company name",
            },
          ]}
        >
          <Input type="text" placeholder="Input company name" />
        </Form.Item>
      </Space>
    </>
  );
}
