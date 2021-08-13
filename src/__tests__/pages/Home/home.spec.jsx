import { render } from "@testing-library/react";
import { Home } from "@/pages";

describe("Home", () => {
  test("Deve renderizar o Home", () => {
    render(<Home />);
  });
});
