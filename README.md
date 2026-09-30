# Molecular Atlas — 3D分子図鑑

Babylon.jsで分子模型を回転・拡大しながら観察できる、日本語のインタラクティブ分子図鑑です。GitHub Pagesへそのまま公開できます。

## 収録分子

水、二酸化炭素、アンモニア、メタン、エタノール、`(R)/(S)-乳酸`、ベンゼン、β-D-グルコース、カフェイン、フラーレンC60の11構造を収録しています。C60は切頂二十面体の幾何から60原子・90結合を生成しています。乳酸は鏡像関係を比較できるよう、R体とS体を鏡面整列しています。

## 機能

- マウス／タッチによる回転・拡大縮小
- 球棒モデル／小球を使った教材モデル／空間充填モデルの切り替え
- `(R)/(S)-乳酸`の鏡像ペア切り替え
- 原子を選択して元素名・原子量を表示
- 自動回転、視点リセット、全画面、PNG保存
- PC、タブレット、スマートフォン対応

## ローカル実行

Node.js 22以降を推奨します。

```bash
npm install
npm run dev
```

本番ビルドは次のコマンドです。

```bash
npm run build
```

生成物は `dist/` に出力されます。

## GitHub Pagesへの公開

1. このプロジェクトをGitHubリポジトリの `main` ブランチへpushします。
2. GitHubの **Settings → Pages → Build and deployment → Source** で **GitHub Actions** を選びます。
3. `.github/workflows/deploy.yml` が自動でビルド・公開します。

Viteのアセットパスは相対指定のため、`https://ユーザー名.github.io/リポジトリ名/` 形式でも動作します。

## 構造データ

乳酸、β-D-グルコース、カフェインの原子座標と結合は、[PubChem](https://pubchem.ncbi.nlm.nih.gov/) の3D conformer（CID 61503、107689、64689、2519）を参照しています。乳酸のS体は鏡像比較のため、R体の配向を鏡面反転して表示します。

## 技術構成

- Babylon.js 9
- Vite 8
- Vanilla JavaScript / CSS
- GitHub Actions / GitHub Pages
