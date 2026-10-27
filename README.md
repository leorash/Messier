# 星海拾贝 · 梅西耶天体（M天体）探索与练习

一个用于课堂教学的**深空天体辨识小游戏**，收录 **32 个经典梅西耶天体**，提供三种练习模式：

| 模式 | 玩法 |
| --- | --- |
| 看图识星 | 根据深空天体图片，从 4 个 M 编号中选出正确答案，并查看知识讲解 |
| 寻星索骥 | 给出天体编号与俗称，从 4 张真实图像中锁定目标 |
| 星空闪卡 | 背诵模式，点击翻转卡片，查看图片与完整 M 天体知识 |

每轮测验随机抽取 10 题、选项随机排列，答后即时反馈并给出成绩与称号。

> 本版本将原先托管在在线图床（`i.hd-r.cn` / `i.imgs.ovh`）的图片全部
> 内置到 `assets/images/`，**图片不再依赖任何外链，不会再因图床失效而裂图**。
> 目录组织方式与 `seasonal-constellations-plus` 保持一致。

---

## 一、目录结构

```
messier-deep-sky-quiz/
├── index.html              # 入口（主菜单 / 测验 / 结果，单页切换）
├── css/
│   └── styles.css          # 组件自定义样式（星空背景、毛玻璃卡片、闪卡翻转等）
├── js/
│   ├── app.js              # 游戏主逻辑：随机出题、三种模式渲染、判分
│   └── protect.js          # 页面防护（禁用开发者工具 / 快捷键 / 右键）
├── data/
│   └── data.js             # 32 个 M 天体题库 + 菜单配图配置
├── assets/
│   └── images/             # 32 张天体图片（M1.jpg … M104.jpg，本地相对路径引用）
└── README.md
```

---

## 二、本地运行

**最简单**：双击 `index.html`，用任意现代浏览器打开即可，图片使用相对路径，
本地直接打开也能正常显示。

如个别浏览器对本地文件有限制，可在本目录起静态服务器：

```bash
python -m http.server 8767
# 访问 http://127.0.0.1:8767/index.html
```

> 说明：页面的 Tailwind CSS、图标库、字体与防护脚本仍通过 CDN 加载，
> 首次使用需联网；**核心的天体图片已全部本地化，不依赖图床**。

---

## 三、部署到 GitHub Pages（获取在线游戏链接）

1. 在 GitHub 新建一个仓库，例如 `messier-deep-sky-quiz`（可设为 Public）。
2. 将本文件夹内的**全部内容**上传到仓库根目录（保证 `index.html` 位于仓库根目录）。
   - 网页端：仓库页 **Add file → Upload files**，拖入全部文件后提交；
   - 或使用命令行：
     ```bash
     cd messier-deep-sky-quiz
     git init
     git add .
     git commit -m "星海拾贝：M天体辨识游戏，图片本地化"
     git branch -M main
     git remote add origin https://github.com/<你的用户名>/messier-deep-sky-quiz.git
     git push -u origin main
     ```
3. 打开仓库 **Settings → Pages**：
   - **Source** 选择 `Deploy from a branch`；
   - **Branch** 选择 `main` 分支、文件夹选 `/ (root)`，点击 **Save**。
4. 等待 1–2 分钟，页面顶部会显示发布地址，即游戏链接：

   ```
   https://<你的用户名>.github.io/messier-deep-sky-quiz/
   ```

   把该链接发给学生即可直接在浏览器中游戏，无需安装任何东西。

> 后续更新文件并 push 后，GitHub Pages 会自动重新发布，稍等片刻刷新即可。

---

## 四、维护与扩充

- **修改知识讲解**：编辑 `data/data.js` 中对应天体的 `info` 字段。
- **替换图片**：用同名文件替换 `assets/images/` 中的图片即可，无需改代码。
- **新增天体**：把图片放入 `assets/images/`，在 `data/data.js` 的
  `window.MESSIER_DATA` 数组中按现有格式追加一条记录（`id` 必须唯一）。
- **菜单配图**：在 `data/data.js` 的 `window.CUSTOM_ICONS` 中修改；
  留空 `""` 则恢复默认图标。

---

*designed by 木瓜 · 仅供课堂教学使用*
