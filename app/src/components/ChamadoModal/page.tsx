"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, message, Modal, Input, Select, Form, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const area = ["Refrigeração", "Energia", "Ar-condicionado", "Água"] as const;
const prioridade = ["Crítica", "Alta", "Média", "Baixa"] as const;

const schema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  area: z.enum(area),
  prioridade: z.enum(prioridade),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  equipamento: z.string().min(1, "Equipamento é obrigatório"),
  instalacao: z.string().min(1, "Instalação é obrigatória"),
  responsavel: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ChamadoModalProps {
  onSubmit?: (data: FormData) => void;
}

export default function ChamadoModal({ onSubmit: externalOnSubmit }: ChamadoModalProps) {
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

  const onFormSubmit = (data: FormData) => {
    if (externalOnSubmit) {
      externalOnSubmit(data);
    }
    message.success("Chamado criado com sucesso!");
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
        <Form layout="vertical" component="form" onFinish={handleSubmit(onFormSubmit)}>
          <Form.Item
            label={<span style={{ fontWeight: "600" }}>Título</span>}
            validateStatus={errors.titulo ? "error" : ""}
            help={errors.titulo?.message}
            style={{ marginBottom: 16 }}
          >
            <Controller
              name="titulo"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: "600" }}>Área</span>}
            validateStatus={errors.area ? "error" : ""}
            help={errors.area?.message}
            style={{ marginBottom: 16 }}
          >
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Selecione uma área"
                  value={field.value}
                  onChange={field.onChange}
                >
                  {area.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: "600" }}>Prioridade</span>}
            validateStatus={errors.prioridade ? "error" : ""}
            help={errors.prioridade?.message}
            style={{ marginBottom: 16 }}
          >
            <Controller
              name="prioridade"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Selecione uma prioridade"
                  value={field.value}
                  onChange={field.onChange}
                >
                  {prioridade.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: "600" }}>Descrição</span>}
            validateStatus={errors.descricao ? "error" : ""}
            help={errors.descricao?.message}
            style={{ marginBottom: 16 }}
          >
            <Controller
              name="descricao"
              control={control}
              render={({ field }) => <TextArea {...field} rows={4} />}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: "600" }}>Equipamento</span>}
            validateStatus={errors.equipamento ? "error" : ""}
            help={errors.equipamento?.message}
            style={{ marginBottom: 16 }}
          >
            <Controller
              name="equipamento"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: "600" }}>Instalação</span>}
            validateStatus={errors.instalacao ? "error" : ""}
            help={errors.instalacao?.message}
            style={{ marginBottom: 16 }}
          >
            <Controller
              name="instalacao"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: "600" }}>Responsável (Opcional)</span>}
            validateStatus={errors.responsavel ? "error" : ""}
            help={errors.responsavel?.message}
            style={{ marginBottom: 16 }}
          >
            <Controller
              name="responsavel"
              control={control}
              render={({ field }) => <Input {...field} />}
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
