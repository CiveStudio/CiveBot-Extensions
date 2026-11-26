# 插件开发指南

## 接口

每个插件导出对象：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| name | string | 插件名（日志用） |
| match | (text, ctx) => boolean | 是否处理这条消息 |
| handle | async (text, ctx) => string\|null | 返回回复文本，null 表示不处理 |

## ctx 内容

- ws：NapCat WebSocket（可直接发消息）
- chatId / isGroup / senderQQ / senderName：会话信息
- db：SQLite 数据库
- callV1：调用大脑（慎用，会消耗 token）
- bili：B站模块
- hormones：激素系统
- getWs()：获取当前 ws

## 示例

见 `tools/fortune.js`。