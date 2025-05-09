import { render, screen } from "@testing-library/react";
import { UserCard } from "../cards/UserCard";
import { getUserById } from "../utils/supabaseFunctions";
import { BrowserRouter } from "react-router";
import userEvent from "@testing-library/user-event";

jest.mock("../utils/supabaseFunctions", () => ({
  getUserById: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

// モックデータを作成
const mockUser = {
  id: "apple",
  name: "テストユーザー",
  description: "<p>テストユーザーの説明</p>",
  skill_name: "React",
  github_id: "testuser",
  qiita_id: "testuser",
  x_id: "testuser",
  getGithubUrl: jest.fn(() => "https://github.com/testuser"),
  getQiitaUrl: jest.fn(() => "https://qiita.com/testuser"),
  getXUrl: jest.fn(() => "https://x.com/testuser"),
};

beforeEach(() => {
  jest.clearAllMocks();
  // DBから取得したデータをモックする
  (getUserById as jest.Mock).mockResolvedValue([mockUser]);
});

describe("UserCard", () => {
  it("名前が表示されていること", async () => {
    render(<UserCard />, { wrapper: BrowserRouter });

    expect(await screen.findByTestId("name")).toHaveTextContent(
      "テストユーザー"
    );
  });

  it("自己紹介が表示されていること", async () => {
    render(<UserCard />, { wrapper: BrowserRouter });

    expect(await screen.findByTestId("description")).toHaveTextContent(
      "テストユーザーの説明"
    );
  });

  it("好きな技術が表示されていること", async () => {
    render(<UserCard />, { wrapper: BrowserRouter });

    expect(await screen.findByTestId("favorite_skill")).toHaveTextContent(
      "React"
    );
  });

  it("GitHubのアイコンが表示されていること", async () => {
    render(<UserCard />, { wrapper: BrowserRouter });

    expect(await screen.findByTestId("github-icon")).toBeInTheDocument();
  });

  it("Qiitaのアイコンが表示されていること", async () => {
    render(<UserCard />, { wrapper: BrowserRouter });

    expect(await screen.findByTestId("qiita-icon")).toBeInTheDocument();
  });

  it("Xのアイコンが表示されていること", async () => {
    render(<UserCard />, { wrapper: BrowserRouter });

    expect(await screen.findByTestId("x-icon")).toBeInTheDocument();
  });

  it("戻るボタンをクリックすると/に遷移すること", async () => {
    render(<UserCard />, { wrapper: BrowserRouter });

    // 戻るボタンをクリック
    const removeButton = await screen.findByTestId("remove-button");
    await userEvent.click(removeButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
