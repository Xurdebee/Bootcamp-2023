import React from "react";
import { render, screen } from "@testing-library/react";
import ColumnaMiUsuario from "./ColumnaMiUsuario";

describe("ColumnaMiUsuario", () => {
  beforeEach(() => {
    // Simula la función fetch para que devuelva un objeto con los datos esperados
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          name: "John",
          surname: "Doe",
          alias: "johndoe",
          education: "Computer Science",
          number_posts: 10,
          number_friends: 5,
          number_likes: 20,
          image: "https://example.com/profile.jpg",
        },
      ]),
    });
  });

  it("renders user data correctly", async () => {
    render(<ColumnaMiUsuario />);

    // Espera a que se carguen los datos del usuario
    await screen.findByText("John Doe");
    await screen.findByText("johndoe");
    await screen.findByText("Computer Science");
    await screen.findByText("10");
    await screen.findByText("5");
    await screen.findByText("20");

    // Verifica que los elementos se encuentren en el DOM
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe")).toBeInTheDocument();
    expect(screen.getByText("Computer Science")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });
});
