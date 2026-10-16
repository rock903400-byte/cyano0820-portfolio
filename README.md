# cyano0820-portfolio

> 一位老師的影像日記 — 劉德榮（@cyano0820）YouTube 頻道作品集網站

以影像記錄生活 18 年，把教育、兩個寶寶、家庭日常、廟裡的詩歌、
巷口街頭與音樂都放進這個「小小宇宙」。

頻道：<https://www.youtube.com/@cyano0820>

## 技術棧

React 19 + Vite 8，純前端靜態站，無後端。

| 套件 | 版本 | 用途 |
|---|---|---|
| `react` / `react-dom` | ^19.2.7 | UI |
| `vite` | ^8.1.1 | 建置工具 |
| `@vitejs/plugin-react` | ^6.0.3 | React 支援 |
| `oxlint` | ^1.71.0 | Lint（取代 ESLint） |

## 指令

```bash
npm install
npm run dev       # 開發伺服器
npm run build     # 建置到 dist/
npm run preview   # 預覽建置結果
npm run lint      # oxlint
```

## 結構

```text
cyano0820-portfolio/
├── index.html              # Vite entry
├── src/
│   ├── main.jsx            # React 掛載
│   ├── App.jsx / App.css   # 主頁面
│   ├── index.css           # 全域樣式
│   └── data/
│       ├── channel.js      # 頻道資訊（名稱、訂閱數、簡介、語錄）
│       └── videos.js       # 影片清單
├── public/favicon.svg
└── vite.config.js
```

## 資料來源

頻道統計（訂閱數、影片數、創建日期）與頭像橫幅皆為靜態寫入於
`src/data/channel.js` 的 `CHANNEL_INFO`，**不會自動更新**。
需要準確數字時請手動更新該檔案。

## License

[MIT](LICENSE)