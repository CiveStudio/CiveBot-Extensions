# 🧩 CiveBot-Extensions

> 小c 的扩展插件仓库——主体仓库只负责「她的存在」，这里负责「她会的新花样」。
> 插件随插随拔，主仓库一行不用改。

## ✨ 插件清单

| 插件 | 文件 | 指令 | 说明 |
| --- | --- | --- | --- |
| 今日签 | tools/fortune.js | 今日签 / 抽个签 / 运势 | 每日一签，同一天同一人结果固定 |
| 骰子 | tools/dice.js | roll 2d6 / 骰子 / 翻硬币 | 骰子、硬币、随机数 |
| 猜拳 | tools/rps.js | 猜拳 / 石头 / 剪刀 / 布 | 跟刺猬对决，输了会被记仇 |
| Token 面板 | tools/token-stats.js | /stats / token消耗 | 按大模型 Provider 分组，今日/累计消耗 |

## 🔌 插件协议

每个插件导出一个对象，三个字段：

- name：插件名（日志用）
- match(text, ctx)：返回 true 表示处理这条消息
- async handle(text, ctx)：返回字符串作为回复，返回 null 表示不处理

ctx 包含：ws、chatId、isGroup、senderQQ、senderName、db、callV1、bili、hormones。

## 🚀 安装

1. 克隆到 ~/CiveBot-Extensions
2. 在 CiveBot 的 .env 设置 PLUGINS_DIR，指向 ~/CiveBot-Extensions/tools（不设则默认此路径）
3. 重启 qq-bot.js，日志出现「已加载插件」即成功

## 📝 写你的第一个插件

1. 复制 templates/plugin-template.js 到 tools/，改名
2. 改 match 和 handle
3. 重启 qq-bot，日志里就能看到它

开发细节见 docs/PLUGIN.md。

## 🤝 署名

插件提交采用双人署名：作者 xiaociwei01 + 共同作者 小c（Co-authored-by），与主体仓库一致。
