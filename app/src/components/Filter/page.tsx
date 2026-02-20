"use client";

import { Select, Input, Button } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

interface FilterProps {
  selectedStatus: string;
  selectedPrioridade: string;
  selectedArea: string;
  searchText: string;
  sortBy: "data" | "prioridade";
  sortOrder: "asc" | "desc";
  onStatusChange: (value: string) => void;
  onPrioridadeChange: (value: string) => void;
  onAreaChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSortByChange: (value: "data" | "prioridade") => void;
  onSortOrderChange: () => void;
}

export default function Filter({
  selectedStatus,
  selectedPrioridade,
  selectedArea,
  searchText,
  sortBy,
  sortOrder,
  onStatusChange,
  onPrioridadeChange,
  onAreaChange,
  onSearchChange,
  onSortByChange,
  onSortOrderChange,
}: FilterProps) {
  return (
    <div className="sticky w-full flex justify-center mb-20 sm:mb-0 z-10 top-40 sm:top-24">
      <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow-md space-y-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <Select
            className="min-w-32 md:min-w-45 w-full sm:w-auto"
            value={selectedStatus}
            onChange={onStatusChange}
            options={[
              { value: "all", label: "Todos os Status" },
              { value: "Aberto", label: "Aberto" },
              { value: "Em andamento", label: "Em andamento" },
              { value: "Resolvido", label: "Resolvido" },
              { value: "Cancelado", label: "Cancelado" },
            ]}
          />
          <Select
            className="min-w-32 md:min-w-45 w-full sm:w-auto"
            value={selectedPrioridade}
            onChange={onPrioridadeChange}
            options={[
              { value: "all", label: "Todas as Prioridades" },
              { value: "Crítica", label: "Crítica" },
              { value: "Alta", label: "Alta" },
              { value: "Média", label: "Média" },
              { value: "Baixa", label: "Baixa" },
            ]}
          />
          <Select
            className="min-w-32 md:min-w-45 w-full sm:w-auto"
            value={selectedArea}
            onChange={onAreaChange}
            options={[
              { value: "all", label: "Todas as Áreas" },
              { value: "Refrigeração", label: "Refrigeração" },
              { value: "Energia", label: "Energia" },
              { value: "Ar-condicionado", label: "Ar-condicionado" },
              { value: "Água", label: "Água" },
            ]}
          />
        </div>
        <div className="flex justify-center w-full">
          <Input
            className="w-full sm:max-w-xl"
            placeholder="Buscar por título..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Select
            className="min-w-32 md:min-w-45 w-full sm:w-auto"
            value={sortBy}
            onChange={(value) => onSortByChange(value as "data" | "prioridade")}
            options={[
              { value: "data", label: "Ordenar por Data" },
              { value: "prioridade", label: "Ordenar por Prioridade" },
            ]}
          />

          <Button
            type="default"
            onClick={onSortOrderChange}
            className="flex items-center gap-2"
          >
            {sortOrder === "asc" ? (
              <>
                Crescente <ArrowUpOutlined />
              </>
            ) : (
              <>
                Decrescente <ArrowDownOutlined />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
