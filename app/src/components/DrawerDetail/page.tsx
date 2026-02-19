"use client";

import { Drawer, Timeline } from "antd";
import PriorityTag from "../PriorityTag/page";

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

interface DrawerDetailProps {
  chamado: Chamado | null;
  open: boolean;
  onClose: () => void;
}

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

export default function DrawerDetail({
  chamado,
  open,
  onClose,
}: DrawerDetailProps) {
  return (
    <Drawer
      title={chamado?.titulo}
      placement="right"
      onClose={onClose}
      open={open}
      size={400}
    >
      {chamado && (
        <>
          <p>
            <strong>Status:</strong> {chamado.status}
          </p>
          <p>
            <strong>Prioridade:</strong>{" "}
            <PriorityTag
              prioridade={
                chamado.prioridade as "Crítica" | "Alta" | "Média" | "Baixa"
              }
            />
          </p>
          <p>
            <strong>Área:</strong> {chamado.area}
          </p>
          <p>
            <strong>Equipamento:</strong> {chamado.equipamento}
          </p>
          <p>
            <strong>Instalação:</strong> {chamado.instalacao}
          </p>
          <p>
            <strong>Abertura:</strong> {formatDateTime(chamado.abertura)}
          </p>
          <p>
            <strong>Última Atualização:</strong>{" "}
            {formatDateTime(chamado.ultimaAtualizacao)}
          </p>
          <p>
            <strong>Descrição:</strong> {chamado.descricao}
          </p>
          <p>
            <strong>Responsável:</strong> {chamado.responsavel || "N/A"}
          </p>

          <h3 className="mt-4 mb-2 font-bold">Timeline de Atualizações</h3>
          <Timeline
            items={[
              {
                content: `Chamado criado em ${new Date(chamado.abertura).toLocaleString()}`,
              },
              {
                content: `Última atualização em ${new Date(chamado.ultimaAtualizacao).toLocaleString()}`,
              },
            ]}
          />
        </>
      )}
    </Drawer>
  );
}
