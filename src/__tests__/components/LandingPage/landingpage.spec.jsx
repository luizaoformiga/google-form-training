import { render } from "@testing-library/react";
import { LandingPage } from "@/components";

describe("LandingPage", () => {
  test("Deve renderizar o LandingPage", () => {
    render(<LandingPage />);
  });
});
