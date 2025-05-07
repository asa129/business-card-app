import { render, screen } from "@testing-library/react";
import { UserCard } from "../cards/UserCard";
import { getUserById } from "../utils/supabaseFunctions";
import { BrowserRouter } from "react-router";

jest.mock("../utils/supabaseFunctions", () => ({
  getUserById: jest.fn(),
}));

describe("UserCard", () => {
  it("名前が表示されていること", async () => {
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

    // DBから取得したデータをモックする
    (getUserById as jest.Mock).mockResolvedValue([mockUser]);

    render(
      <BrowserRouter>
        <UserCard />
      </BrowserRouter>
    );

    expect(await screen.findByTestId("name")).toHaveTextContent(
      "テストユーザー"
    );
  });
});
