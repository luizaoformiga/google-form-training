import { render } from "@testing-library/react";
import { Copyright } from "@/components/LandingPage/copyright";

describe("Copyright", () => {
  test("Deve renderizar o Copyright", () => {
    render(<Copyright />);
  });
});
