import { BrowserRouter } from "react-router";
import { RegistCard } from "../cards/RegistCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { insertData } from "../utils/supabaseFunctions";

jest.mock("../utils/supabaseFunctions.ts", () => ({
  insertData: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("RegistCard", () => {
  it("タイトルが表示されていること", async () => {
    render(<RegistCard />, { wrapper: BrowserRouter });
    expect(await screen.findByTestId("title")).toHaveTextContent(
      "新規名刺登録"
    );
  });

  it("全項目入力して登録ボタンを押すと/に遷移する(useNavigateのパスが/であることをみる)", async () => {
    // モックデータを作成
    const mockUser = {
      id: "app",
      name: "テストユーザー",
      description: "<p>テストユーザーの説明</p>",
      favorite_technique_id: "1",
      github_id: "testuser",
      qiita_id: "testuser",
      x_id: "testuser",
    };

    render(<RegistCard />, { wrapper: BrowserRouter });

    const user = userEvent.setup();

    // 各入力フィールドに値を入力
    await user.type(await screen.findByTestId("id"), "app");
    await user.type(await screen.findByTestId("name"), "テストユーザー");
    await user.type(
      await screen.findByTestId("description"),
      "<p>テストユーザーの説明</p>"
    );
    await user.selectOptions(
      await screen.findByTestId("favorite_technique_id"),
      ["1"]
    );
    await user.type(await screen.findByTestId("github_id"), "testuser");
    await user.type(await screen.findByTestId("qiita_id"), "testuser");
    await user.type(await screen.findByTestId("x_id"), "testuser");

    // 登録ボタンをクリックする前にモックでDB登録したことにする
    (insertData as jest.Mock).mockResolvedValueOnce(mockUser);

    // 登録ボタンをクリック
    await user.click(await screen.findByTestId("submit-button"));

    // DB登録が呼ばれたことを確認
    expect(insertData).toHaveBeenCalledTimes(1); // 呼び出し回数を確認

    // /に遷移したことを確認
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("IDが未入力の状態で登録ボタンを押すとエラーメッセージが表示されること", async () => {
    render(<RegistCard />, { wrapper: BrowserRouter });

    const user = userEvent.setup();

    // IDフィールド以外を入力
    await user.type(await screen.findByTestId("name"), "テストユーザー");
    await user.type(
      await screen.findByTestId("description"),
      "<p>テストユーザーの説明</p>"
    );
    await user.selectOptions(
      await screen.findByTestId("favorite_technique_id"),
      ["1"]
    );
    await user.type(await screen.findByTestId("github_id"), "testuser");
    await user.type(await screen.findByTestId("qiita_id"), "testuser");
    await user.type(await screen.findByTestId("x_id"), "testuser");

    // 登録ボタンをクリック
    await user.click(await screen.findByTestId("submit-button"));

    // IDが未入力のエラーメッセージが表示されることを確認
    expect(
      await screen.findByText("好きな英単語は必須です")
    ).toBeInTheDocument();
  });

  it("名前が未入力の状態で登録ボタンを押すとエラーメッセージが表示されること", async () => {
    render(<RegistCard />, { wrapper: BrowserRouter });

    const user = userEvent.setup();

    // 名前フィールド以外を入力
    await user.type(await screen.findByTestId("id"), "app");
    await user.type(
      await screen.findByTestId("description"),
      "<p>テストユーザーの説明</p>"
    );
    await user.selectOptions(
      await screen.findByTestId("favorite_technique_id"),
      ["1"]
    );
    await user.type(await screen.findByTestId("github_id"), "testuser");
    await user.type(await screen.findByTestId("qiita_id"), "testuser");
    await user.type(await screen.findByTestId("x_id"), "testuser");
    // 登録ボタンをクリック
    await user.click(await screen.findByTestId("submit-button"));

    // 名前が未入力のエラーメッセージが表示されることを確認
    expect(await screen.findByText("お名前は必須です")).toBeInTheDocument();
  });

  it("自己紹介が未入力の状態で登録ボタンを押すとエラーメッセージが表示されること", async () => {
    render(<RegistCard />, { wrapper: BrowserRouter });

    const user = userEvent.setup();

    // 自己紹介フィールド以外を入力
    await user.type(await screen.findByTestId("id"), "app");
    await user.type(await screen.findByTestId("name"), "テストユーザー");
    await user.selectOptions(
      await screen.findByTestId("favorite_technique_id"),
      ["1"]
    );
    await user.type(await screen.findByTestId("github_id"), "testuser");
    await user.type(await screen.findByTestId("qiita_id"), "testuser");
    await user.type(await screen.findByTestId("x_id"), "testuser");
    // 登録ボタンをクリック
    await user.click(await screen.findByTestId("submit-button"));
    // 自己紹介が未入力のエラーメッセージが表示されることを確認
    expect(await screen.findByText("自己紹介は必須です")).toBeInTheDocument();
  });

  it("好きな技術が未選択の状態で登録ボタンを押すとエラーメッセージが表示されること", async () => {
    render(<RegistCard />, { wrapper: BrowserRouter });

    const user = userEvent.setup();

    // 好きな技術フィールド以外を入力
    await user.type(await screen.findByTestId("id"), "app");
    await user.type(await screen.findByTestId("name"), "テストユーザー");
    await user.type(
      await screen.findByTestId("description"),
      "<p>テストユーザーの説明</p>"
    );
    await user.type(await screen.findByTestId("github_id"), "testuser");
    await user.type(await screen.findByTestId("qiita_id"), "testuser");
    await user.type(await screen.findByTestId("x_id"), "testuser");
    // 登録ボタンをクリック
    await user.click(await screen.findByTestId("submit-button"));
    // 好きな技術が未選択のエラーメッセージが表示されることを確認
    expect(await screen.findByText("好きな技術は必須です")).toBeInTheDocument();
  });

  it("任意の項目は入力しなくても登録できること", async () => {
    // モックデータを作成
    const mockUser = {
      id: "app",
      name: "テストユーザー",
      description: "<p>テストユーザーの説明</p>",
      favorite_technique_id: "1",
    };
    render(<RegistCard />, { wrapper: BrowserRouter });

    const user = userEvent.setup();

    // 必須項目のみ入力
    await user.type(await screen.findByTestId("id"), "app");
    await user.type(await screen.findByTestId("name"), "テストユーザー");
    await user.type(
      await screen.findByTestId("description"),
      "<p>テストユーザーの説明</p>"
    );
    await user.selectOptions(
      await screen.findByTestId("favorite_technique_id"),
      ["1"]
    );

    // 登録ボタンをクリックする前にモックでDB登録したことにする
    (insertData as jest.Mock).mockResolvedValueOnce(mockUser);

    // 登録ボタンをクリック
    await user.click(await screen.findByTestId("submit-button"));

    // DB登録が呼ばれたことを確認
    expect(insertData).toHaveBeenCalledTimes(1); // 呼び出し回数を確認
    // 正しいデータが呼び出されたことを確認
    expect(insertData).toHaveBeenCalledWith({
      id: "app",
      name: "テストユーザー",
      description: "<p>テストユーザーの説明</p>",
      favorite_technique_id: "1",
      github_id: "",
      qiita_id: "",
      x_id: "",
    });
  });
});
