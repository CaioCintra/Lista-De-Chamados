import { faker } from "@faker-js/faker";

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

const status = ["Aberto", "Em andamento", "Resolvido", "Cancelado"] as const;
const prioridade = ["Crítica", "Alta", "Média", "Baixa"] as const;
const area = ["Refrigeração", "Energia", "Ar-condicionado", "Água"] as const;

export function generateMockChamados(count: number = 1000): Chamado[] {
  const chamados: Chamado[] = [];

  for (let i = 1001; i < 1001 + count; i++) {
    const baseDate = faker.date.past({ years: 1 });
    const updateDate = new Date(baseDate);
    updateDate.setDate(
      updateDate.getDate() + faker.number.int({ min: 0, max: 30 }),
    );

    chamados.push({
      id: i,
      titulo: faker.lorem.sentence().slice(0, -1),
      area: faker.helpers.arrayElement(area),
      prioridade: faker.helpers.arrayElement(prioridade),
      status: faker.helpers.arrayElement(status),
      equipamento: faker.commerce.productName(),
      instalacao: faker.lorem.sentence().slice(0, -1),
      abertura: baseDate.toISOString(),
      ultimaAtualizacao: updateDate.toISOString(),
      descricao: faker.lorem.paragraph(),
      responsavel:
        faker.helpers.maybe(() => faker.person.fullName(), {
          probability: 0.6,
        }) || null,
    });
  }

  return chamados;
}
