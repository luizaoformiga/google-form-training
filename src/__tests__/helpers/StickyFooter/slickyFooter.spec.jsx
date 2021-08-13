import { render } from "@testing-library/react";
import { StickyFooter } from "@/helpers";

describe("StickyFooter", () => {
  test("Deve renderizar o StickyFooter", () => {
    render(<StickyFooter />);
  });
});
