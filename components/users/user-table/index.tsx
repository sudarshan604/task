"use client";
import { Table, Flex, Input, Button, Modal, Typography, Layout } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import { columns } from "./columns";
import CreateUserForm from "../form/create";
import { useGetUsersQuery } from "../../../services/usersApi";
import Fuse from "fuse.js";

const UserTable = () => {
  const { Text } = Typography;
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({ skip: 0, take: 8 });

  const { data: users, isLoading } = useGetUsersQuery();

  const fuse = useMemo(() => {
    return new Fuse(users || [], {
      keys: ["name", "email"],
      threshold: 0.3,
    });
  }, [users]);

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    if (query && fuse) {
      return fuse.search(query).map((result) => result.item);
    }

    return users;
  }, [query, users, fuse]);
  const paginatedUsers = useMemo(() => {
    const start = filter.skip;
    const end = start + filter.take;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, filter]);

  return (
    <Layout.Content
      style={{
        minHeight: "100vh",
        marginTop: "40px",
        padding: "0 20px",
      }}
    >
      <Table
        loading={isLoading}
        title={() => (
          <div>
            <p>Users Table</p>
            <Flex gap={8} align="center">
              <Input.Search
                placeholder="Search user by name or email"
                prefix={<SearchOutlined />}
                onSearch={(value) => {
                  setQuery(value);
                  setFilter({ skip: 0, take: filter.take });
                }}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setFilter({ skip: 0, take: filter.take });
                }}
              />
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setIsOpen(true)}
              >
                New User
              </Button>
            </Flex>
          </div>
        )}
        columns={columns}
        dataSource={paginatedUsers}
        rowKey="id"
        scroll={{ x: 768 }}
        pagination={{
          pageSize: filter.take,
          total: filteredUsers.length,
          current: filter.skip / filter.take + 1,
          onChange: (page, pageSize) => {
            setFilter({
              skip: (page - 1) * pageSize,
              take: pageSize,
            });
          },
        }}
      />
      <Modal
        centered
        footer={null}
        title={<Text>Add New User</Text>}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        afterOpenChange={(open) => setIsOpen(open)}
      >
        <CreateUserForm onCancel={() => setIsOpen(false)} />
      </Modal>
    </Layout.Content>
  );
};

export default UserTable;
