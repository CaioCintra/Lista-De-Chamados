"use client";
import { useState, useEffect } from "react";
import { theme } from "antd";
import chamadosData from "./src/mocks/chamados.json";
import "antd/dist/reset.css";
import Filter from "./src/components/Filter/page";
import ChamadoModal from "./src/components/ChamadoModal/page";
import DrawerDetail from "./src/components/DrawerDetail/page";
import VirtualizedCardList from "./src/components/VirtualizedCardList/page";
import RoleToggle from "./src/components/RoleToggle/page";
import { generateMockChamados } from "./src/utils/generateMockChamados";
import GestorDashboard from "./src/components/GestorDashboard/page";

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

export default function Home() {
  const { token } = theme.useToken();
  const [chamados, setChamados] = useState<Chamado[]>(() => {
    const generated = generateMockChamados(1500);
    return [...chamadosData, ...generated];
  });
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPrioridade, setSelectedPrioridade] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState<"data" | "prioridade">("data");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedChamado, setSelectedChamado] = useState<Chamado | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<"tecnico" | "gestor">("tecnico");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const addChamado = (newChamado: {
    titulo: string;
    area: string;
    prioridade: string;
    descricao: string;
    equipamento: string;
    instalacao: string;
    responsavel?: string;
  }) => {
    const id = Math.max(...chamados.map((c) => c.id)) + 1;
    const now = new Date().toISOString();
    const chamado: Chamado = {
      ...newChamado,
      id,
      abertura: now,
      ultimaAtualizacao: now,
      status: "Aberto",
      responsavel: newChamado.responsavel || null,
    };
    setChamados([...chamados, chamado]);
  };

  const filteredAndSortedChamados = chamados
    .filter((chamado: Chamado) => {
      const matchesStatus =
        selectedStatus === "all" || chamado.status === selectedStatus;
      const matchesPrioridade =
        selectedPrioridade === "all" ||
        chamado.prioridade === selectedPrioridade;
      const matchesArea =
        selectedArea === "all" || chamado.area === selectedArea;
      const matchesSearch = chamado.titulo
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchesStatus && matchesPrioridade && matchesArea && matchesSearch;
    })
    .sort((a: Chamado, b: Chamado) => {
      if (sortBy === "data") {
        const dateA = new Date(a.abertura);
        const dateB = new Date(b.abertura);
        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      } else {
        const priorityOrder: { [key: string]: number } = {
          Crítica: 4,
          Alta: 3,
          Média: 2,
          Baixa: 1,
        };
        const priA = priorityOrder[a.prioridade] || 0;
        const priB = priorityOrder[b.prioridade] || 0;
        return sortOrder === "asc" ? priA - priB : priB - priA;
      }
    });

  return (
    <>
      <header
        className="relative flex p-7 flex-col sm:flex-row sm:items-center gap-4 sm:gap-0"
        style={{
          backgroundColor: token.colorPrimary,
          width: "100%",
        }}
      >
        <h1 className="text-center text-2xl mb-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:text-4xl font-bold text-white">
          Chamados
        </h1>
        <div className="sm:ml-auto">
          <RoleToggle role={role} onChange={setRole} />
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center p-10 sm:p-24">
        {role === "tecnico" ? (
          <div style={{ width: "100%" }}>
            <Filter
              selectedStatus={selectedStatus}
              selectedPrioridade={selectedPrioridade}
              selectedArea={selectedArea}
              searchText={searchText}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onStatusChange={setSelectedStatus}
              onPrioridadeChange={setSelectedPrioridade}
              onAreaChange={setSelectedArea}
              onSearchChange={setSearchText}
              onSortByChange={setSortBy}
              onSortOrderChange={() =>
                setSortOrder(sortOrder === "asc" ? "desc" : "asc")
              }
            />

            <div style={{ marginTop: "1.5rem" }}>
              <VirtualizedCardList
                chamados={filteredAndSortedChamados}
                onCardClick={(chamado) => {
                  setSelectedChamado(chamado);
                  setDrawerVisible(true);
                }}
                isLoading={isLoading}
              />
            </div>

            <DrawerDetail
              chamado={selectedChamado}
              open={drawerVisible}
              onClose={() => setDrawerVisible(false)}
            />
            <ChamadoModal onSubmit={addChamado} />
          </div>
        ) : (
          <GestorDashboard chamados={chamados} />
        )}
      </main>
    </>
  );
}
