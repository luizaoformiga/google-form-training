import { render } from "@testing-library/react";
import Routes from "@/routes";

describe("Routes", () => {
  test("Deve renderizar o Routes", () => {
    render(<Routes />);
  });
});
