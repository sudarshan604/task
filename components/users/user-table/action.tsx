"use client";

import {
  Button,
  Flex,
  Modal,
  Tooltip,
  Typography,
  theme,
  App as AntdApp,
} from "antd";
import {
  DeleteFilled,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { ColumnType } from "./columns";
import { useState } from "react";
import UpdateUserForm from "../form/update";
import { useDeleteUserMutation, userApi } from "@/services/usersApi";
import { useAppDispatch } from "@/hooks";
import { formatError } from "@/lib/utils";
import ViewUserModal from "./view";

const { useToken } = theme;

export default function UserTableActions({ record }: { record: ColumnType }) {
  const { Text } = Typography;
  const { token } = useToken();
  const { notification } = AntdApp.useApp();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const [viewUser, setViewUser] = useState(false);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(record.id).unwrap();
      dispatch(
        userApi.util.updateQueryData("getUsers", undefined, (draft) => {
          return draft.filter((user) => user.id !== record.id);
        })
      );
      notification.success({
        message: "User Deleted",
        description: `User ${
          record.name ?? record.email
        } was deleted successfully.`,
      });
    } catch (error) {
      notification.error({
        message: "Deletion Failed",
        description: formatError(error),
      });
    }
  };

  const confirmDelete = () => {
    modal.confirm({
      centered: true,
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: (
        <p>
          Are you sure you want to delete user {record.name ?? record.email}?
        </p>
      ),
      okText: "Yes",
      cancelText: "Cancel",
      onOk: handleDelete,
      okButtonProps: { loading: isDeleting, disabled: isDeleting },
    });
  };

  return (
    <>
      <Flex gap={4} align="center">
        <Tooltip title="View User">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => setViewUser(true)}
          ></Button>
        </Tooltip>
        <Tooltip title="Edit User">
          <Button
            type="text"
            onClick={() => setIsEditOpen(true)}
            icon={<EditOutlined />}
          ></Button>
        </Tooltip>

        <Tooltip title="Delete User">
          <Button
            type="text"
            icon={<DeleteFilled style={{ color: token.colorError }} />}
            onClick={confirmDelete}
          ></Button>
        </Tooltip>
      </Flex>

      <Modal
        centered
        footer={null}
        title={<Text>Edit User</Text>}
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        afterOpenChange={(open) => setIsEditOpen(open)}
      >
        <UpdateUserForm
          id={record.id}
          initialData={record}
          onCancel={() => setIsEditOpen(false)}
        />
      </Modal>

      <ViewUserModal
        visible={viewUser}
        user={record}
        onCancel={() => setViewUser(false)}
      />
      {contextHolder}
    </>
  );
}
