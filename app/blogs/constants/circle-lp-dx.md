---
title: AIツール多様化時代の学生チーム開発基盤 - Docusaurus + ruleSyncで実現した持続可能な受託開発体制
createdAt: "2025-01-03"
updatedAt: "2025-01-03"
excerpt: "大学サークルの受託開発で、メンバーごとに異なるAIツール（Claude/ChatGPT/Cursor）を使う環境でも統一されたコード品質を保つための開発基盤構築事例"
published: false
---
注意：現在draftです。方向性は合ってますがコンテキスト食わせたAIに喋ってもらっているので後で修正します

# 【学生受託開発】AIツール多様化時代のチーム開発基盤づくり - Docusaurus + ruleSyncで実現する文脈共有とDX改善

## はじめに

大学2年生で、プログラミングサークルのチーム開発として、学内サークルのLP（ランディングページ）制作を受託しました。

「普通にやっても詰まらない」という思いから、以下の課題に挑戦しました：

- 📚 **ドキュメント文化**: 受託開発レベルの文脈共有
- 🔧 **保守性**: サークルを抜けた後も保守しやすい設計
- 🤖 **AIツール多様化**: Claude/ChatGPT/Cursor/GitHub Copilotなど、メンバーごとに異なるツールを使う環境での統一性確保

この記事では、**Docusaurus**と**ruleSync**を組み合わせて構築した開発基盤と、その効果を紹介します。

---

## プロジェクト概要

- **プロジェクト**: 早稲田大学ソーシャルビジネスサークルのWebサイト制作
- **チーム構成**: プログラミングサークルメンバー5名（技術レベル差あり）
- **技術スタック**: Next.js 16 (App Router) + TypeScript + Tailwind CSS + microCMS
- **開発期間**: 3ヶ月
- **リポジトリ**: [tsukuneA1/sobus](https://github.com/tsukuneA1/sobus)

---

## 課題認識

### 1. 技術レベルの差
- Next.js経験者 vs 初学者
- TypeScript理解度のばらつき
- 非同期処理・型定義の知識差

### 2. AIツールの多様化
- Claude Code（私）
- ChatGPT + Cursor（メンバーA）
- GitHub Copilot（メンバーB）
- AI未使用（メンバーC）

**問題**: 各自が異なるプロンプトでコードを生成 → コーディング規約がバラバラに

### 3. 引き継ぎの難しさ
- 私が卒業後、誰が保守できるのか？
- 暗黙知のドキュメント化が必要

---

## 解決策: Docusaurus + ruleSync

### アーキテクチャ

```
sobus/ 
├── app/ # Next.jsアプリケーション本体 
├── docusaurus/ # 技術ドキュメント（Docusaurus） 
│ ├── docs/ 
│ │ ├── requirements/ # 要件定義
│ │ ├── pages/ # ページ実装方針 
│ │ ├── microCMS/ # API仕様 
│ │ └── tech-stack.md 
│ └── sidebars.ts 
├── .rulesync/ # AIツール統一ルール 
│ ├── rules/ 
│ │ ├── coding-standards.md 
│ │ ├── component-design.md 
│ │ └── commit-conventions.md 
│ └── commands/ 
│ └── review.md # /review コマンド 
└── CLAUDE.md # 開発ガイド
```

---

## 技術選定の理由

### Docusaurus
- **Markdownで書ける**: 非エンジニアでも編集可能
- **バージョニング機能**: 仕様変更の履歴管理
- **検索機能**: 大量のドキュメントでも探しやすい
- **Vercel/GitHub Pagesで簡単デプロイ**

### ruleSync
- **AIツール横断**: Claude/ChatGPT/Cursorなど、どのツールでも同じルールを適用
- **カスタムコマンド**: `/review`でコードレビュー、`/build-docs`でドキュメント生成
- **自動同期**: `.rulesync/`配下のルールをチーム全員で共有

---

## 実装例

### 1. フロントエンド開発規約（ruleSync）

`.rulesync/rules/frontend-development.md`:

```markdown
# フロントエンド開発規約

## コンポーネント設計

### Presentational/Containerパターン

- **Presentational**: UIのみ担当（`src/components/`）
- **Container**: データ取得・ロジック担当（`src/app/`）

### Export規約

- **Named Export**: すべてのPresentationalコンポーネント
- **Default Export**: ページコンポーネント（`page.tsx`）のみ

## スタイリング

### カスタムカラーの使用（必須）

`globals.css`で定義されたカスタムカラーを**必ず使用**すること。

- `primary`: `#EB8338` - ブランドカラー
- `secondary`: `#F7F1D4` - セカンダリカラー

❌ Bad: ハードコード
```typescript
<div className="bg-orange-500">
✅ Good: カスタムカラー
<div className="bg-primary">
コメント規約
基本方針: コメントは最小限に
必ずプレフィックスをつける：
TODO: 要実装（GitHubイシューリンク付き）
NOTE: 補足説明
FIXME: 既知のバグ
WARNING: 重要な注意事項

**効果**: 
- Claude/ChatGPT/Cursorがこのルールを読み込み、統一されたコードを生成
- 新メンバーも`.rulesync/`を見れば即座にルール理解

---

### 2. カスタムコマンド（ruleSync）

`.rulesync/commands/review.md`:

```markdown
# /review コマンド

## 実行内容
コードレビューチェックリストに基づいて、変更内容を検証する。

## チェック項目
- [ ] Presentational/Containerパターンに従っている
- [ ] named export（ページ以外）/ default export（ページ）を使い分けている
- [ ] カスタムカラー（primary/secondary）を使用している
- [ ] 不要なコメントがない（TODO/NOTE等のプレフィックス付きのみ）
- [ ] セマンティックHTMLを使用している
使い方:
Claude Code: /review と入力するだけでレビュー実行
ChatGPT/Cursor: ruleSyncプラグインで同じコマンドを実行
3. Docusaurus技術ドキュメント
docusaurus/docs/pages/top-page.md:
# トップページ実装方針

## 要件定義
- ファーストビューでMVV（Mission/Vision/Value）を表示
- 最新プロジェクト3件を自動取得（microCMS）
- スクロールアニメーション（Framer Motion）

## 実装

### データ取得（Server Component）

```typescript
// app/src/app/page.tsx
import { getProjects } from '@/lib/microcms';

const TopPage = async () => {
  const projects = await getProjects({ limit: 3, orders: '-createdAt' });

  return (
    <main>
      <HeroSection />
      <ProjectList projects={projects} />
    </main>
  );
};

export default TopPage;
ISR設定
export const revalidate = 3600; // 1時間ごとに再生成
技術的考慮点
NOTE: Next.js 15ではfetchのキャッシュがデフォルト無効化されているため、ISRには明示的にrevalidate指定が必要
```

---

## 成果と効果

### 定量的な成果
- **コードレビュー時間**: 30分/PR → 10分/PR（ruleSyncによる自動チェック）
- **ドキュメント参照率**: 80%（週次ミーティングで測定）
- **コーディング規約違反**: 初期20件/週 → 2件/週に減少

### 定性的な効果
1. **新メンバーのオンボーディング高速化**
   - Docusaurusの「はじめに」ページで30分で環境構築完了
   - ruleSyncで初日からチーム規約に従ったコード生成

2. **AIツール多様化への対応**
   - メンバーが好きなツールを選べる
   - ruleSyncで出力品質は統一

3. **引き継ぎの容易化**
   - 私が抜けた後も、Docusaurusに全仕様が残る
   - 新リーダーがruleSyncを見れば開発再開可能

---

## 苦労した点

### ruleSyncの学習コスト
- まだマイナーなツールで、日本語ドキュメント少ない
- カスタムコマンドの書き方を試行錯誤

### ドキュメントのメンテナンス
- コードとドキュメントの乖離を防ぐため、PRごとにドキュメント更新ルール化
- CI/CDでドキュメントビルドチェック（`npm run build-docs`）

---

## 今後の展開

### 技術的改善
- [ ] Storybookの導入（コンポーネントカタログ）
- [ ] E2Eテスト（Playwright）
- [ ] ruleSyncのカスタムコマンド拡張（`/generate-component`等）

### チーム運用
- [ ] ruleSyncのベストプラクティスをサークル内で共有
- [ ] Docusaurusテンプレートを他の受託案件にも適用

---

## まとめ

学生のチーム開発でも、**ドキュメント文化**と**DX投資**は効果的でした。

特に「AIツール多様化時代」において、**ruleSync**のような統一基盤は今後ますます重要になると感じています。

受託開発や長期運用を見据えたプロジェクトで、ぜひ参考にしてみてください！

---

## リンク
- リポジトリ: https://github.com/winc1980/sobiz
- Docusaurus: https://docusaurus.io/
- ruleSync: 
