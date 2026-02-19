"use client";

import { useState } from "react";
import { Pagination, Empty } from "antd";
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
  chamados: Chamado[];
  onCardClick: (chamado: Chamado) => void;
  pageSize?: number;
  isLoading?: boolean;
}

const ITEMS_PER_PAGE = 20;

export default function VirtualizedCardList({
  chamados,
  onCardClick,
  pageSize = ITEMS_PER_PAGE,
  isLoading = false,
}: VirtualizedCardListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedChamados = chamados.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {chamados.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center"
          style={{ minHeight: "600px" }}
        >
          <Empty
            description="Nenhum resultado encontrado"
            style={{ marginTop: "2rem" }}
          />
        </div>
      ) : (
        <>
          <div
            style={{
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={chamados.length}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper={true}
            />
          </div>
          <div
            className="flex flex-col"
            style={{ minHeight: "600px", gap: "2rem" }}
          >
            {paginatedChamados.map((chamado) => (
              <StatCard
                key={chamado.id}
                chamado={chamado}
                loading={isLoading}
                onClick={() => onCardClick(chamado)}
              />
            ))}
          </div>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={chamados.length}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper={true}
            />
          </div>
        </>
      )}
    </div>
  );
}
