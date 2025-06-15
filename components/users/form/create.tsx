"use client";

import { Button, Flex, Form, Space, theme, App as AntdApp } from "antd";

import UserFormFields from "./UserFormFields";
import { useAddUserMutation, userApi } from "@/services/usersApi";
import { ColumnType } from "../user-table/columns";
import { useAppDispatch } from "@/hooks";
import { formatError } from "@/lib/utils";

const { useToken } = theme;

export default function CreateUserForm({
  onCancel,
}: {
  onCancel?: () => void;
}) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { notification } = AntdApp.useApp();

  const [addUser, { isLoading }] = useAddUserMutation();

  const handleOnFinish = async (values: Partial<ColumnType>) => {
    // const id = Date.now();
    try {
      const updatedUser = await addUser({
        ...values,
      }).unwrap();
      dispatch(
        userApi.util.updateQueryData("getUsers", undefined, (draft) => {
          draft.unshift(updatedUser);
        })
      );
      notification.success({
        message: "User Added",
        description: `User ${
          values.name ?? values.email
        } was Added successfully.`,
      });
      onCancel?.();
    } catch (error) {
      notification.error({
        message: "Added Failed",
        description: formatError(error),
      });
    }
  };
  const { token } = useToken();

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
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Save New User
          </Button>
        </Flex>
      </Space>
    </Form>
  );
}
