# 🧩 CiveBot-Extensions

小c 的扩展插件仓库——主体仓库只负责「她的存在」，这里负责「她会的新花样」。

## 插件清单

| 插件 | 文件 | 指令 |
| --- | --- | --- |
| 今日签 | `tools/fortune.js` | 今日签 / 抽个签 / 运势 |
| 骰子 | `tools/dice.js` | roll 2d6 / 骰子 / 翻硬币 |

## 怎么用

1. 克隆本仓库到 `~/CiveBot-Extensions`
2. 在 CiveBot 的 `.env` 里设置 `PLUGINS_DIR=$HOME/CiveBot-Extensions/tools`（不设则默认此路径）
3. 重启 qq-bot.js，日志出现 `🔌 已加载插件：xxx`

## 写新插件

复制 `templates/plugin-template.js` 改名放进 `tools/`，实现 `match` 和 `handle` 即可。
详细规范见 `docs/PLUGIN.md`。