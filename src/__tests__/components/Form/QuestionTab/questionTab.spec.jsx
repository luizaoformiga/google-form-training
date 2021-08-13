import { render } from "@testing-library/react";
import { Form } from "@/components";

describe("QuestionTab", () => {
  test("Deve renderizar o QuestionTab", () => {
    render(<Form.QuestionTab />);
  });
});
