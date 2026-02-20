"use client";

import { Virtuoso } from "react-virtuoso";
import { Empty } from "antd";
import StatCard from "../StatCard/page";

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

interface VirtualizedCardListProps {
  chamados?: Chamado[];
  onCardClick?: (chamado: Chamado) => void;
  isLoading?: boolean;
}

export default function VirtualizedCardList({
  chamados = [],
  onCardClick = () => {},
  isLoading = false,
}: VirtualizedCardListProps) {
  if (!isLoading && chamados.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{ minHeight: "60vh" }}
      >
        <Empty description="Nenhum resultado encontrado" />
      </div>
    );
  }

  return (
    <Virtuoso
      useWindowScroll
      data={chamados}
      overscan={200}
      itemContent={(index, chamado) => (
        <div style={{ paddingTop: "3rem", paddingBottom: "1rem" }}>
          <StatCard
            chamado={chamado}
            loading={isLoading}
            onClick={() => onCardClick(chamado)}
          />
        </div>
      )}
    />
  );
}
