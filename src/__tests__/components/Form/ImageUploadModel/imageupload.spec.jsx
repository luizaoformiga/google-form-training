import { render } from "@testing-library/react";
import { Form } from "@/components";

describe("ImageUploadModel", () => {
  test("Deve renderizar o ImageUploadModel", () => {
    render(<Form.ImageUploadModel />);
  });
});
