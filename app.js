/**
 * app.js
 *
 * Powered by Node.js and weixin-robot, thx.
 *
 * Author: fantasyshao (blog.fantasy.codes)
 * License: MIT
 *
 */

var express = require('express');
var webot = require('weixin-robot');

var app = express();

var token = 'tnwechattest';

// 添加session支持
app.use(express.cookieParser());
app.use(express.session({ secret: 'wechattest', store: new express.session.MemoryStore() }));

// 监听web请求
webot.watch(app, { token: token, path: '/' });

// 载入规则
require('./rules')(webot);

// 监听端口
var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Listening', port);
});

app.enable('trust proxy');
