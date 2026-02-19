"use client";

import { Switch, Space, Tooltip } from "antd";
import { UserOutlined, AreaChartOutlined } from "@ant-design/icons";

interface RoleToggleProps {
  role: "tecnico" | "gestor";
  onChange: (role: "tecnico" | "gestor") => void;
}

export default function RoleToggle({ role, onChange }: RoleToggleProps) {
  return (
    <div
      className="flex justify-center sm:justify-start"
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Space size="middle">
          <Tooltip title="Técnico">
            <UserOutlined style={{ fontSize: "1.5rem", cursor: "pointer" }} />
          </Tooltip>
          <Switch
            checked={role === "gestor"}
            onChange={(checked) => onChange(checked ? "gestor" : "tecnico")}
          />
          <Tooltip title="Gestor">
            <AreaChartOutlined style={{ fontSize: "1.5rem", cursor: "pointer" }} />
          </Tooltip>
        </Space>
      </div>
    </div>
  );
}
