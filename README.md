# 沙拉壁纸移动落地页

面向移动端投放的壁纸落地页，包含萌宠、风景和动漫三个主题，以及自动轮播的锁屏上屏效果。

## 公网地址

- GitHub Pages: <https://hooooz.github.io/qutu-nova-mobile-landing/>
- GitHub 仓库: <https://github.com/Hooooz/qutu-nova-mobile-landing>

## 页面路由

- `/`: 萌宠主题
- `/t/scenery/`: 风景主题
- `/t/anime/`: 动漫主题

## 本地开发

需要 Node.js `>=22.13.0`。

```bash
npm ci
npm run dev
```

本地默认地址为 <http://localhost:3000/>。

## 验证

```bash
npm test
npm run test:pages
npm run lint
```

- `npm test` 验证服务端构建和现有页面行为。
- `npm run test:pages` 生成 GitHub Pages 静态产物并验证页面、路由和资源路径。
- `npm run lint` 执行代码检查。

## 发布

推送到 `main` 分支后，[GitHub Actions](.github/workflows/deploy-pages.yml) 会自动完成测试、静态构建并发布 `dist/client` 到 GitHub Pages。

正式下载地址确认后，通过 `NEXT_PUBLIC_APP_DOWNLOAD_URL` 注入应用商店或投放下载链接；未配置时按钮不会产生跳转。
