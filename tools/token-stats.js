// 📊 Token 消耗面板：按大模型 Provider 分组（中文版）
module.exports = {
    name: 'token-stats',
    match: (text) => /^(\/stats|token消耗|token统计|用量|花了多少)/i.test(text),
    handle(text, ctx) {
        const db = ctx.db;
        const fmt = (n) => Number(n || 0).toLocaleString('en-US');

        function block(rows, title) {
            if (!rows.length) return `${title}\n（暂无数据，先聊几句吧）`;
            let out = title + '\n';
            for (const r of rows) {
                const total = (r.pt || 0) + (r.ot || 0);
                out += `【${r.provider} · ${r.model}】${r.n} 次对话\n`;
                out += `总消耗：${fmt(total)} tokens\n`;
                out += `输入（缓存命中）：${fmt(r.ct)}\n`;
                out += `输入（未命中）：${fmt((r.pt || 0) - (r.ct || 0))}\n`;
                out += `输出：${fmt(r.ot)}\n`;
            }
            return out;
        }

        try {
            const today = db.prepare(`SELECT provider, model, SUM(prompt_tokens) pt, SUM(cached_tokens) ct, SUM(completion_tokens) ot, COUNT(*) n FROM token_usage WHERE date(created_at,'localtime') = date('now','localtime') GROUP BY provider, model ORDER BY pt DESC`).all();
            const all = db.prepare(`SELECT provider, model, SUM(prompt_tokens) pt, SUM(cached_tokens) ct, SUM(completion_tokens) ot, COUNT(*) n FROM token_usage GROUP BY provider, model ORDER BY pt DESC`).all();
            return `📊 小c 的 Token 消耗\n\n${block(today, '📅 今日')}\n${block(all, '📈 累计')}`;
        } catch (e) {
            return `⚠️ 查询失败（确认 server.js 已跑过且建表成功）：${e.message}`;
        }
    },
};