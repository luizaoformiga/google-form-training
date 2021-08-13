import { render } from "@testing-library/react";
import PrivateRoute from "@/routes/PrivateRoute";

describe("PrivateRoute", () => {
  test("Deve renderizar o PrivateRoute", () => {
    render(<PrivateRoute exact={true} path="/Home" />);
  });
});
