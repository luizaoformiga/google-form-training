import { render } from "@testing-library/react";
import { TabPanel } from "../../../pages/EditForm/tabPanel";

describe("TabPanel", () => {
  test("Deve renderizar o TabPanel", () => {
    render(<TabPanel />);
  });
});
