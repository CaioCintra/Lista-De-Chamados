"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Modal, Input, Select, Form, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const areas = ["Refrigeração", "Energia", "Ar-condicionado", "Água"] as const;
const prioridades = ["Crítica", "Alta", "Média", "Baixa"] as const;

const schema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  area: z.enum(areas),
  prioridade: z.enum(prioridades),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  equipamento: z.string().min(1, "Equipamento é obrigatório"),
  instalacao: z.string().min(1, "Instalação é obrigatória"),
  responsavel: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ChamadoModalProps {
  onSubmit?: (data: FormData) => void;
}

export default function ChamadoModal({ onSubmit }: ChamadoModalProps) {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: "",
      area: undefined,
      prioridade: undefined,
      descricao: "",
      equipamento: "",
      instalacao: "",
      responsavel: "",
    },
  });

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const submitHandler = (data: FormData) => {
    onSubmit?.(data);
    setOpen(false);
    reset();
  };

  return (
    <>
      <Modal
        title="Novo Chamado"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <Form layout="vertical" onFinish={handleSubmit(submitHandler)}>
          <Form.Item
            validateStatus={errors.titulo ? "error" : ""}
            help={errors.titulo?.message}
          >
            <label htmlFor="titulo">Título</label>
            <Controller
              name="titulo"
              control={control}
              render={({ field }) => <Input {...field} id="titulo" />}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.area ? "error" : ""}
            help={errors.area?.message}
          >
            <label htmlFor="area">Área</label>
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="area"
                  options={areas.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.prioridade ? "error" : ""}
            help={errors.prioridade?.message}
          >
            <label htmlFor="prioridade">Prioridade</label>
            <Controller
              name="prioridade"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="prioridade"
                  options={prioridades.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.descricao ? "error" : ""}
            help={errors.descricao?.message}
          >
            <label htmlFor="descricao">Descrição</label>
            <Controller
              name="descricao"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  id="descricao"
                  rows={4}
                  style={{ resize: "none" }}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.equipamento ? "error" : ""}
            help={errors.equipamento?.message}
          >
            <label htmlFor="equipamento">Equipamento</label>
            <Controller
              name="equipamento"
              control={control}
              render={({ field }) => <Input {...field} id="equipamento" />}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.instalacao ? "error" : ""}
            help={errors.instalacao?.message}
          >
            <label htmlFor="instalacao">Instalação</label>
            <Controller
              name="instalacao"
              control={control}
              render={({ field }) => <Input {...field} id="instalacao" />}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.responsavel ? "error" : ""}
            help={errors.responsavel?.message}
          >
            <label htmlFor="responsavel">Responsável (Opcional)</label>
            <Controller
              name="responsavel"
              control={control}
              render={({ field }) => <Input {...field} id="responsavel" />}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Criar Chamado
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Tooltip title="Criar novo chamado">
        <Button
          aria-label="Novo Chamado"
          type="primary"
          shape="circle"
          size="large"
          icon={<PlusOutlined style={{ fontSize: 28 }} />}
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            right: 36,
            bottom: 36,
            zIndex: 1000,
            width: 72,
            height: 72,
          }}
        />
      </Tooltip>
    </>
  );
}
