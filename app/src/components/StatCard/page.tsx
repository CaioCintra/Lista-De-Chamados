"use client";

import PriorityTag from "../PriorityTag/page";
import { Card } from "antd";

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

interface Chamado {
  id: number;
  titulo: string;
  area: string;
  prioridade: string;
  status: string;
  equipamento: string;
  instalacao: string;
  abertura: string;
  ultimaAtualizacao: string;
  descricao: string;
  responsavel: string | null;
}

interface CardProps {
  chamado: Chamado;
  loading: boolean;
  onClick: () => void;
}

export default function StatCard({ chamado, loading, onClick }: CardProps) {
  return (
    <Card
      loading={loading}
      key={chamado.id}
      className="p-4 rounded cursor-pointer 
             transition-transform duration-200 ease-in-out
             hover:shadow-lg hover:scale-105"
      onClick={onClick}
    >
      <h2 className="font-bold">{chamado.titulo}</h2>
      <p>Status: {chamado.status}</p>
      <p>
        Prioridade:{" "}
        <PriorityTag
          prioridade={
            chamado.prioridade as "Crítica" | "Alta" | "Média" | "Baixa"
          }
        />
      </p>
      <p>Área: {chamado.area}</p>
      <p>Data de Abertura: {formatDateTime(chamado.abertura)}</p>
    </Card>
  );
}
