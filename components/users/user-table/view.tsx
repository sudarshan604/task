"use client";

import { Modal, Descriptions, Typography, Button } from "antd";
import { CreateUserSchema } from "@/lib/validators/user-schema";

interface ViewUserModalProps {
  visible: boolean;
  onCancel: () => void;
  user: CreateUserSchema;
}

export default function ViewUserModal({
  visible,
  onCancel,
  user,
}: ViewUserModalProps) {
  return (
    <Modal
      centered
      title={<Typography.Text strong>View User Details</Typography.Text>}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" type="primary" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      <Descriptions bordered column={1} size="middle" style={{ marginTop: 16 }}>
        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
        <Descriptions.Item label="Company">{user.company}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
