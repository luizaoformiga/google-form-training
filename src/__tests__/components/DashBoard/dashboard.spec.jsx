import { render } from "@testing-library/react";
import { DashBoard } from "@/components";

describe("DashBoard", () => {
  test("Deve renderizar o DashBoard", () => {
    render(<DashBoard />);
  });
});
