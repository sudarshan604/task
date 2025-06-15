"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Avatar, Card, Flex, Input, Select, Spin, Typography } from "antd";
import UserCard from "./User-card";
import { useGetUsersQuery } from "@/services/randomUserApir";
import Fuse from "fuse.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { RandomUserSchema } from "@/lib/validators/user-schema";
const { Search } = Input;

const UserList = () => {
  const [page, setPage] = useState(12);
  const [allUsers, setAllUsers] = useState<RandomUserSchema[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<string | null>(null);

  const { data, isLoading } = useGetUsersQuery(page);

  useEffect(() => {
    let isMounted = true;

    if (data?.results?.length && isMounted) {
      setAllUsers((prev) => [...prev, ...data.results]);

      if (data.results.length < 10) {
        setHasMore(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [data]);

  const fuse = useMemo(() => {
    return new Fuse(allUsers, {
      keys: ["name.first", "name.last", "email", "gender"],
      threshold: 0.3,
    });
  }, [allUsers]);

  const filteredUsers = useMemo(() => {
    let filtered = allUsers;

    if (genderFilter) {
      filtered = filtered.filter((user) => user.gender === genderFilter);
    }

    if (query && fuse) {
      filtered = fuse.search(query).map((result) => result.item);
    }

    return filtered;
  }, [query, genderFilter, allUsers, fuse]);

  const fetchMoreUsers = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <>
        <Flex
          vertical={false}
          justify="center"
          align="center"
          gap="8"
          style={{
            padding: "0 20px",
          }}
        >
          <Search
            placeholder="Search by name or email"
            allowClear
            enterButton="Search"
            onSearch={(value) => setQuery(value)}
            onChange={(e) => setQuery(e.target.value)}
            style={{ margin: "24px 24px" }}
          />
          <Select
            placeholder="Filter by gender"
            allowClear
            style={{ width: 260 }}
            onChange={(value) => setGenderFilter(value)}
          >
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Flex>
        <Flex wrap="wrap" justify="center" gap={16} style={{ width: "100%" }}>
          {Array.from({ length: 12 }).map((_, index) => {
            {
              return (
                <Card
                  loading={isLoading}
                  hoverable
                  key={index}
                  style={{
                    width: 300,
                    margin: "16px",
                    textAlign: "center",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Avatar size={64} />
                  <Typography.Title
                    level={4}
                    style={{ margin: 0 }}
                  ></Typography.Title>
                  <Typography.Text
                    type="secondary"
                    style={{ display: "block", margin: "8px 0" }}
                  ></Typography.Text>
                  <Typography.Text
                    style={{ textTransform: "capitalize" }}
                  ></Typography.Text>
                </Card>
              );
            }
          })}
        </Flex>
        ;
      </>
    );
  }

  return (
    <>
      <Flex
        vertical={false}
        justify="center"
        align="center"
        gap="8"
        style={{
          padding: "0 20px",
        }}
      >
        <Search
          placeholder="Search by name or email"
          allowClear
          enterButton="Search"
          onSearch={(value) => setQuery(value)}
          onChange={(e) => setQuery(e.target.value)}
          style={{ margin: "24px 24px" }}
        />
        <Select
          placeholder="Filter by gender"
          allowClear
          style={{ width: 260 }}
          onChange={(value) => setGenderFilter(value)}
        >
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Flex>

      <InfiniteScroll
        dataLength={filteredUsers.length}
        next={fetchMoreUsers}
        hasMore={!query && !genderFilter && hasMore}
        loader={
          !query &&
          !genderFilter && (
            <div style={{ textAlign: "center", padding: 20 }}>
              <Spin />
            </div>
          )
        }
        style={{ overflow: "visible" }}
      >
        <Flex wrap="wrap" justify="center" gap={16} style={{ width: "100%" }}>
          {filteredUsers.map((user) => (
            <UserCard key={user.email} data={user} />
          ))}
        </Flex>
      </InfiniteScroll>
    </>
  );
};

export default UserList;
