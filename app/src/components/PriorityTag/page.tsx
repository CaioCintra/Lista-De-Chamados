"use client";

import { Tag } from "antd";

interface PriorityTagProps {
  prioridade: "Crítica" | "Alta" | "Média" | "Baixa";
}

const priorityColors: Record<string, string> = {
  Crítica: "red",
  Alta: "orange",
  Média: "yellow",
  Baixa: "green",
};

export default function PriorityTag({ prioridade }: PriorityTagProps) {
  return (
    <Tag color={priorityColors[prioridade]} className="font-bold">
      {prioridade}
    </Tag>
  );
}
