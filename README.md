# 署名ウェブサイト (Next.js + Supabase + Resend)

## 1. インストール

```bash
npm install
```

## 2. 環境変数

`.env.local.example` を参考に `.env.local` を作成してください。

## 3. Supabase SQL 実行

Supabase SQL Editor で `supabase/001_init_signatures.sql` を実行してください。

## 4. 開発サーバー起動

```bash
npm run dev
```

- トップページ: `/`
- 署名フォーム: `/sign`
- API: `POST /api/signatures`

## 5. デプロイ

Vercel にプロジェクトを接続し、環境変数を設定してデプロイしてください。
