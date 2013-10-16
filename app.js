var express = require('express');
var wechat = require('wechat');

var log = require('debug')('webot-example:log');
var verbose = require('debug')('webot-example:verbose');

var app = express();

var TOKEN = 'tnwechattest';

app.use(express.query());
app.use('/wechat', wechat(TOKEN, function (req, res, next) {
   var message = req.weixin;
   if (message.FromUserName === 'diaosi') {
        res.reply('hehe');
   } else if (message.FromUserName === 'text') {
        res.reply({
            content: 'text object',
            type: 'text'
        });
   } else {
        res.reply({
            title: 'Come on!',
            description: 'This is a conversation between Diaosi&Nvshen!'
        });
   }
}));

app.use('/', function(req, res) {
    res.writeHead(200);
    res.end('Hello tn-wechat');
});

app.listen(process.env.VCAP_APP_PORT || 3000, function() {
    log("Server starting...");
});

app.enable('trust proxy');
