import { render } from "@testing-library/react";
import { UserView } from "@/pages";

describe("UserView", () => {
  test("Deve renderizar o UserView", () => {
    render(<UserView />);
  });
});
