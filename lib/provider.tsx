"use client";

import { customTheme } from "@/theme";
import { ConfigProvider } from "antd";
import { App as AntdApp } from "antd";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "./store";
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={customTheme}>
      <Provider store={store}>
        <AntdApp>{children}</AntdApp>
      </Provider>
    </ConfigProvider>
  );
}
