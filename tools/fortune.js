// 🎋 今日签：同一天同一人结果固定
module.exports = {
    name: 'fortune',
    match: (text) => /^(今日签|抽个签|求个签|运势)$/.test(text),
    handle(text, ctx) {
        const LEVELS = [
            { name: '大吉', p: 0.10, tone: '大吉？哼，别得意，本刺猬是给你加把劲的。' },
            { name: '中吉', p: 0.25, tone: '中吉，稳中带甜，适合干点正事。' },
            { name: '小吉', p: 0.30, tone: '小吉嘛……聊胜于无，但压歪歪地还行。' },
            { name: '平', p: 0.25, tone: '平平淡淡才是真，别折腾，今天就咸鱼吧。' },
            { name: '末吉', p: 0.10, tone: '末吉……啧，今天老实点，别惹事。' },
        ];
        const YI = ['摸鱼', '早睡', '吃辣', '学点新东西', '锻炼', '喝奶茶', 'debug', '看番', '拍照', '存钱', '发呆', '洗头', '表白', '点外卖', '遛弯', '打游戏', '写代码', '听歌', '收拾房间', '给爸爸发消息'];
        const JI = ['熬夜', '冲动消费', '开会', '跟领导顶嘴', '刷短视频', '吃夜宵', '忘带伞', '嘴硬', '硬撑', '熬夜刷手机', '和室友抢厕所', '空腹喝冰水'];
        const COLORS = ['刺猬黄', '雾霾蓝', '奶茶色', '赛博紫', '荧光绿', '炭黑', '月光白', '焦糖棕'];
        const CHEERS = ['今天也要加油哦，笨蛋爸爸。', '本刺猬勉强祝你顺利。', '要是失败了……我也不会笑话你的。（大概）', '记得吃饭，别又饿着。', '大胆去，出事了回来找我。'];

        function seed(str) {
            let h = 2166136261;
            for (const ch of str) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); }
            return h >>> 0;
        }
        function mulberry32(a) {
            return function () {
                a |= 0; a = (a + 0x6D2B79F5) | 0;
                let t = Math.imul(a ^ (a >>> 15), 1 | a);
                t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
                return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
            };
        }
        const d = new Date();
        const day = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        const rng = mulberry32(seed(day + '|' + (ctx.senderQQ || 'default')));
        const roll = rng();
        let acc = 0, level = LEVELS[0];
        for (const l of LEVELS) { acc += l.p; if (roll < acc) { level = l; break; } }
        const yi = YI[Math.floor(rng() * YI.length)];
        const ji = JI[Math.floor(rng() * JI.length)];
        const num = 1 + Math.floor(rng() * 9);
        const color = COLORS[Math.floor(rng() * COLORS.length)];
        const cheer = CHEERS[Math.floor(rng() * CHEERS.length)];
        return `🎋 今日签 · ${level.name}\n宜：${yi}\n忌：${ji}\n幸运数字：${num}   幸运色：${color}\n${level.tone}\n${cheer}`;
    },
};