"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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

interface ChamadoContextType {
  addChamado: (newChamado: {
    titulo: string;
    area: string;
    prioridade: string;
    descricao: string;
    equipamento: string;
  }) => void;
}

const ChamadoContext = createContext<ChamadoContextType | undefined>(undefined);

export function ChamadoProvider({
  children,
  initialChamados,
}: {
  children: ReactNode;
  initialChamados: Chamado[];
}) {
  const [chamados, setChamados] = useState(initialChamados);

  const addChamado = (newChamado: {
    titulo: string;
    area: string;
    prioridade: string;
    descricao: string;
    equipamento: string;
  }) => {
    const id = Math.max(...chamados.map((c) => c.id), 0) + 1;
    const now = new Date().toISOString();
    const chamado: Chamado = {
      ...newChamado,
      id,
      abertura: now,
      ultimaAtualizacao: now,
      status: "Aberto",
      responsavel: null,
      instalacao: "",
    };
    setChamados([...chamados, chamado]);
  };

  return (
    <ChamadoContext.Provider value={{ addChamado }}>
      {children}
    </ChamadoContext.Provider>
  );
}

export function useChamado() {
  const context = useContext(ChamadoContext);
  if (!context) {
    throw new Error("Erro: useChamado deve ser usado dentro de um ChamadoProvider");
  }
  return context;
}
