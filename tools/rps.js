// ✊ 猜拳：石头/剪刀/布
module.exports = {
    name: 'rps',
    match: (text) => /^(猜拳|石头剪刀布)\s*$/.test(text) || /^(石头|剪刀|布)$/.test(text),
    handle(text) {
        let hand = text.replace(/^(猜拳|石头剪刀布)\s*/, '').trim();
        if (!['石头', '剪刀', '布'].includes(hand)) {
            return '✊ 猜拳：直接说「石头」「剪刀」或「布」！';
        }
        const bot = ['石头', '剪刀', '布'][Math.floor(Math.random() * 3)];
        const win = { 石头: '剪刀', 剪刀: '布', 布: '石头' };
        if (hand === bot) return `✊ 平局！我也是${bot}，再来一局！`;
        if (win[hand] === bot) return `你出了${hand}，我出${bot}——哼，你赢了，算你厉害。（小本本记下一次）`;
        return `你出了${hand}，我出${bot}——哈哈哈，输了吧！本刺猬的石头剪刀布可是练过的。`;
    },
};