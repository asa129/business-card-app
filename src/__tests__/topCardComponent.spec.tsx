import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { TopCard } from "../cards/TopCard";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("TopCard", () => {
  it("タイトルが表示されていること", async () => {
    render(<TopCard />, { wrapper: BrowserRouter });
    expect(await screen.findByTestId("title")).toHaveTextContent(
      "デジタル名刺アプリ"
    );
  });

  it("IDを入力してボタンを押すと/cards/:idに遷移する(useNavigateのパスが/cards/:idであることをみる)", async () => {
    render(<TopCard />, { wrapper: BrowserRouter });

    const user = userEvent.setup();

    // IDを入力
    await user.type(await screen.findByTestId("id"), "apple");
    // 名刺を見るボタンをクリック
    await user.click(await screen.findByTestId("submit-button"));

    // useNavigateが呼ばれたことを確認
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/cards/apple");
  });

  it("IDを入力せずにボタンを押すとエラーメッセージが表示されること", async () => {
    render(<TopCard />, { wrapper: BrowserRouter });

    const user = userEvent.setup();

    // 名刺を見るボタンをクリック
    await user.click(await screen.findByTestId("submit-button"));
    // エラーメッセージが表示されることを確認
    expect(await screen.findByText("IDを入力してください")).toBeInTheDocument();
  });

  it("新規登録はこちらを押すと/cards/registerに遷移する", async () => {
    render(<TopCard />, { wrapper: BrowserRouter });

    const link = await screen.findByTestId("register-link");
    expect(link).toHaveAttribute("href", "/cards/register");
  });
});
