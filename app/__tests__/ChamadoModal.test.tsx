import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChamadoModal from "../src/components/ChamadoModal/page";

describe("ChamadoModal", () => {
  it("abre o modal ao clicar no botão", async () => {
    render(<ChamadoModal />);

    await userEvent.click(
      screen.getByRole("button", { name: /novo chamado/i }),
    );

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("não envia quando o formulário está vazio", async () => {
    const mockSubmit = jest.fn();
    render(<ChamadoModal onSubmit={mockSubmit} />);

    await userEvent.click(
      screen.getByRole("button", { name: /novo chamado/i }),
    );

    await userEvent.click(
      screen.getByRole("button", { name: /criar chamado/i }),
    );

    await waitFor(() => {
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });
});
