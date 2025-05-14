# デジタル名刺アプリ

![画面録画 2025-05-14 225608](https://github.com/user-attachments/assets/831df3cb-1b8f-4657-80ee-2413dda865c0)

## 機能概要
* IDを使用して、デジタル名刺を管理できるアプリです。
* 名前、自己紹介を管理、GitHub・Qiita・Xへ容易に遷移できます。
* スマートフォンでの使用を想定
  
## 必要環境
* Node.js（推奨バージョン: 20 以上）
* npm

## 使い方
1. `新規登録はこちら`をクリック
2. 登録情報を入力
3. TOPページにて登録した好きな英単語を入力、「名刺を見る」ボタンを押下
4. 登録したユーザーを確認できる

## インストール
1. パッケージインストール
```bash:
$ npm install
```

2. 開発サーバー起動
```bash:
$ npm run dev
```

3.ブラウザよりURLにアクセス

### 環境変数設定
1. ルート配下に`.env`ファイルを作成
2. Supabaseでプロジェクトを作成し、URL、APIキーを取得、設定してください。
```
VITE_SUPABASE_URL=SupabaseURL
VITE_SUPABASE_ANON_KEY=SupabaseAnonKey
```

