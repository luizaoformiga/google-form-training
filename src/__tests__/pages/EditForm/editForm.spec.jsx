import { render } from "@testing-library/react";
import { EditForm } from "@/pages";

describe("EditForm", () => {
  test("Deve renderizar o EditForm", () => {
    render(<EditForm />);
  });
});
