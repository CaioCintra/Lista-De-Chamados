"use client";

import { ConfigProvider, theme } from "antd";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AntdThemeProvider({ children }: Props) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#ec6725",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
