import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter} from "react-router-dom";

test("Navbar Renders correctly", () => {
  render (<BrowserRouter><Navbar /></BrowserRouter>);
  const FeedElement = screen.getByText(/Feed/i);
  const AmigosElement = screen.getByText(/Amigos/i);
  const MiPerfilElement = screen.getByText(/Mi Perfil/i);
  const DesconectarseElement = screen.getByText(/Desconectarse/i);
  expect(FeedElement).toBeInTheDocument();
  expect(AmigosElement).toBeInTheDocument();
  expect(MiPerfilElement).toBeInTheDocument();
  expect(DesconectarseElement).toBeInTheDocument();
});
