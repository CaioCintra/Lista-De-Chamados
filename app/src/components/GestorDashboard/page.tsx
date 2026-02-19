"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Row, Col, Card, Statistic } from "antd";
import {
  BugOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined,
  TeamOutlined,
} from "@ant-design/icons";

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

interface GestorDashboardProps {
  chamados: Chamado[];
}

export default function GestorDashboard({ chamados }: GestorDashboardProps) {
  const chamadosPorArea = chamados.reduce(
    (acc, chamado) => {
      const area = chamado.area;
      const existing = acc.find((item) => item.name === area);
      if (existing) {
        existing.chamados += 1;
      } else {
        acc.push({ name: area, chamados: 1 });
      }
      return acc;
    },
    [] as Array<{ name: string; chamados: number }>,
  );

  const chamadosPorStatus = chamados.reduce(
    (acc, chamado) => {
      const status = chamado.status;
      const existing = acc.find((item) => item.name === status);
      if (existing) {
        existing.chamados += 1;
      } else {
        acc.push({ name: status, chamados: 1 });
      }
      return acc;
    },
    [] as Array<{ name: string; chamados: number }>,
  );

  const tempoMedioEmHoras =
    chamados.length > 0
      ? chamados.reduce((acc, chamado) => {
          const abertura = new Date(chamado.abertura);
          const agora = new Date();
          const diffMs = agora.getTime() - abertura.getTime();
          const diffHoras = diffMs / (1000 * 60 * 60);
          return acc + diffHoras;
        }, 0) / chamados.length
      : 0;

  const chamadosPorPrioridade = chamados.reduce(
    (acc, chamado) => {
      const prioridade = chamado.prioridade;
      const existing = acc.find((item) => item.name === prioridade);
      if (existing) {
        existing.chamados += 1;
      } else {
        acc.push({ name: prioridade, chamados: 1 });
      }
      return acc;
    },
    [] as Array<{ name: string; chamados: number }>,
  );

  const COLORS = {
    Aberto: "#ec6725",
    "Em Andamento": "#8884d8",
    Resolvido: "#1890ff",
    Cancelado: "#ff4d4f",
    Fechado: "#52c41a",
    Crítica: "#ff4d4f",
    Alta: "#ff7a45",
    Média: "#faad14",
    Baixa: "#52c41a",
  };

  return (
    <div style={{ width: "100%" }}>
      <Row gutter={[16, 16]} style={{ marginBottom: "2rem" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total de Chamados"
              value={chamados.length}
              prefix={<BugOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tempo Médio Aberto"
              value={tempoMedioEmHoras.toFixed(1)}
              suffix="h"
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Abertos"
              value={chamados.filter((c) => c.status === "Aberto").length}
              prefix={<FolderOpenOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Responsáveis"
              value={new Set(chamados.map((c) => c.responsavel)).size}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Chamados por Área" style={{ height: "100%" }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chamadosPorArea}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="chamados" fill="#ec6725" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Distribuição por Status" style={{ height: "100%" }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chamadosPorStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="chamados"
                >
                  {chamadosPorStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[entry.name as keyof typeof COLORS] || "#8884d8"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Distribuição por Prioridade">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chamadosPorPrioridade}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="chamados"
                  stroke="#ec6725"
                  strokeWidth={2}
                  dot={{ fill: "#ec6725", r: 6 }}
                  name="Chamados"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Resumo por Status">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {chamadosPorStatus.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{item.name}</span>
                  <span
                    style={{
                      color: COLORS[item.name as keyof typeof COLORS] || "#000",
                      fontWeight: "bold",
                    }}
                  >
                    {item.chamados}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
