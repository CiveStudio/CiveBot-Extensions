// 📊 Token 消耗面板：与 #LouFung 状态面板同款排版
module.exports = {
    name: 'token-stats',
    match: (text) => /^(\/stats|token消耗|token统计|用量|花了多少)/i.test(text),
    handle(text, ctx) {
        const db = ctx.db;
        const fmt = (n) => Number(n || 0).toLocaleString('en-US');
        const d = new Date();
        const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

        function block(rows, title) {
            if (!rows.length) return `${title}\n（暂无数据，先聊几句吧）\n`;
            let out = `${title}\n`;
            for (const r of rows) {
                const hit = r.ct || 0;
                const prompt = r.pt || 0;
                const miss = Math.max(0, prompt - hit);
                const outT = r.ot || 0;
                const total = hit + miss + outT;
                const rate = (hit + miss) ? (hit / (hit + miss) * 100) : 0;
                out += `模型: ${r.model}（${r.provider}）\n`;
                out += `总消耗: ${fmt(total)}\n`;
                out += `输入（命中）: ${fmt(hit)}\n`;
                out += `输入（未命中）: ${fmt(miss)}\n`;
                out += `输出: ${fmt(outT)}\n`;
                out += `缓存命中率: ${rate.toFixed(1)}%\n\n`;
            }
            return out;
        }

        try {
            const today = db.prepare(`SELECT provider, model, SUM(prompt_tokens) pt, SUM(cached_tokens) ct, SUM(completion_tokens) ot, COUNT(*) n FROM token_usage WHERE date(created_at,'localtime') = date('now','localtime') GROUP BY provider, model ORDER BY pt DESC`).all();
            const all = db.prepare(`SELECT provider, model, SUM(prompt_tokens) pt, SUM(cached_tokens) ct, SUM(completion_tokens) ot, COUNT(*) n FROM token_usage GROUP BY provider, model ORDER BY pt DESC`).all();
                                    return `📊 小c Token 消耗\n\n${block(today, `今日 (${day})`)}${block(all, '累计')}`.trim();
        } catch (e) {
            return `⚠️ 查询失败：${e.message}`;
        }
    },
};