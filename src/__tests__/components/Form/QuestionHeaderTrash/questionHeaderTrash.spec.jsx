import { render } from "@testing-library/react";
import { Form } from "@/components";

describe("QuestionHeaderTrash", () => {
  test("Deve renderizar o QuestionHeaderTrash", () => {
    render(<Form.QuestionHeaderTrash />);
  });
});
