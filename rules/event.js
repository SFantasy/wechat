/**
 * 事件回复
 * 1. 订阅
 * 2. 取消订阅
 * 3. 点击事件
 * 4. 其他
 */
module.exports = function(webot) {

webot.set('wechat_event', {
    pattern: function(info) {
        return info.is('event');
    },
    handler: function(info) {
        var event = info.param.event || '';
        event = event.toLowerCase();

        if(event === 'subscribe') {
            return "感谢关注XXX服务号！\n" +
                    "现在可以和我对话啦！\n" +
                    "(发送“帮助”查看使用指南)";
        } else if(event === 'unsubscribe') {
            return "再见！";
        }

        if(event === 'click') {
            info.type = 'text';
            info.text = info.param.eventKey;
            return;
        }

        return 'o(╯□╰)o 伦家不知道要肿么办了呢……';
    }
});

};