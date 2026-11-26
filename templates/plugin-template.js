// 🧩 插件模板：复制到 tools/ 改个名字就能用
module.exports = {
    name: 'my-plugin',
    // 触发条件：返回 true 表示这条消息归这个插件处理
    match: (text, ctx) => /^我的指令$/.test(text),
    // 处理：返回字符串（会作为回复发出），返回 null 表示不处理
    async handle(text, ctx) {
        return '这是插件的回复';
    },
};