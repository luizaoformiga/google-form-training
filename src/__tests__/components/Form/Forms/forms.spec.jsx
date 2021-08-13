import { render } from "@testing-library/react";
import { Form } from "@/components";

describe("Forms", () => {
  test("Deve renderizar o Forms", () => {
    render(<Form.Forms />);
  });
});
