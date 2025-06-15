"use client";

import { useEffect } from "react";
import { Button, Flex, Form, Space, theme, App as AntdApp } from "antd";
import { ColumnType } from "../user-table/columns";
import UserFormFields from "./UserFormFields";
import { useUpdateUserMutation, userApi } from "@/services/usersApi";
import { useAppDispatch } from "@/hooks";
import { formatError } from "@/lib/utils";
const { useToken } = theme;

export default function UpdateUserForm({
  id,
  onCancel,
  initialData,
}: {
  id: number;
  onCancel?: () => void;
  initialData: ColumnType;
}) {
  const { token } = useToken();
  const [form] = Form.useForm();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();
  const { notification } = AntdApp.useApp();

  const handleOnFinish = async (values: Partial<ColumnType>) => {
    try {
      const updatedUser = await updateUser({ id, ...values }).unwrap();
      dispatch(
        userApi.util.updateQueryData("getUsers", undefined, (draft) => {
          const index = draft.findIndex((user) => user.id === id);
          if (index !== -1) {
            draft[index] = updatedUser;
          }
        })
      );
      notification.success({
        message: "User Updated",
        description: `User ${
          values.name ?? values.email
        } was updated successfully.`,
      });
      onCancel?.();
    } catch (error) {
      notification.error({
        message: "Update Failed",
        description: formatError(error),
      });
    }
  };
  useEffect(() => {
    form.setFieldsValue({ ...initialData });
  }, [initialData]);

  return (
    <Form layout="vertical" size="large" onFinish={handleOnFinish} form={form}>
      <Space direction="vertical" size={18} style={{ width: "100%" }}>
        <UserFormFields />

        <Flex gap={12} align="center" justify="end">
          <Button
            type="primary"
            style={{
              background: token.colorSuccessBg,
              color: "#696969",
              height: 44,
            }}
            htmlType="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button htmlType="submit" type="primary" loading={isUpdating}>
            Update User
          </Button>
        </Flex>
      </Space>
    </Form>
  );
}
