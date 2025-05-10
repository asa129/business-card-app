import { BrowserRouter } from "react-router";
import { RegistCard } from "../cards/RegistCard";
import { render, screen } from "@testing-library/react";

describe("RegistCard", () => {
  it("タイトルが表示されていること", async () => {
    render(<RegistCard />, { wrapper: BrowserRouter });
    expect(await screen.findByTestId("title")).toHaveTextContent(
      "新規名刺登録"
    );
  });
});
