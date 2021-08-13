import { render } from "@testing-library/react";
import { Login } from "@/pages";

describe("Login", () => {
  test("Deve renderizar o Login", () => {
    render(<Login />);
  });
});
