import { render } from "@testing-library/react";
import { Form } from "@/components";

describe("OneForm", () => {
  test("Deve renderizar o OneForm", () => {
    render(<Form.OneForm />);
  });
});
