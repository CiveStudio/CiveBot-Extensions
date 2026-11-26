// 🎲 骰子/硬币/随机选择
module.exports = {
    name: 'dice',
    match: (text) => /^(roll|掷骰子|骰子|翻硬币|抛硬币|抽签)/i.test(text),
    handle(text) {
        if (/硬币/.test(text)) {
            return `🪙 ${Math.random() < 0.5 ? '正面' : '反面'}！（本刺猬亲手抛的）`;
        }
        const m = text.match(/(\d+)\s*[dD]\s*(\d+)/);
        if (m) {
            const n = Math.min(10, +m[1]), sides = Math.min(1000, +m[2]);
            const rolls = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * sides));
            return `🎲 ${rolls.join(' + ')}${n > 1 ? ` = ${rolls.reduce((a, b) => a + b, 0)}` : ''}`;
        }
        return `🎲 ${1 + Math.floor(Math.random() * 6)}！（1-6，够正经吧）`;
    },
};