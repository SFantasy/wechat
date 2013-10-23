/*
 *    app.js
 */

// 配置信息
var Config = require('./config.js');
var Menu = require('./lib/menu.js');
var connect = require('connect');
var wechat = require('wechat');

var List = wechat.List;
List.add('query', [
  ['回复{a}查看马尔代夫', function(info, req, res, next) {
    res.reply({
      title: "马尔代夫",
      description: "上帝抛洒人间的项链",
      picurl: "http://m.tuniucdn.com/filebroker/cdn/olb/5a/9f/5a9f5fe6fc3f125d53ad4b6bb472b24b_w450_h300_c1_t0.jpg",
      url: "http://m.tuniu.com/s/search/q/%E9%A9%AC%E5%B0%94%E4%BB%A3%E5%A4%AB/city/nj/p/1"
    });
  }],
  ['回复{b}查看欧洲', function(info, req, res, next) {
    res.reply({
      title: "欧洲",
      description: "",
      picurl: "http://img3.tuniucdn.com/images/2013-09-03/2/2013-09-031378172861_l.jpg",
      url: "http://m.tuniu.com/s/search/q/%E6%AC%A7%E6%B4%B2/city/nj/p/1"
    });
  }],
  ['回复{c}查看泰国', function(info , req, res, next) {
    res.reply({
      title: "泰国",
      description: "你必须得去看看国足1：5输掉的国家",
      picurl: "http://images4.tuniucdn.com/bbs_insert/2011/20110520/20110520142735_1838.jpg",
      url: "http://m.tuniu.com/s/search/q/%E6%B3%B0%E5%9B%BD/city/nj/p/1"
    });
  }]
  ]);

var app = connect();
app.use(connect.query());
app.use(connect.cookieParser());
app.use(connect.session({ secret: 'wechattest', cookie: { maxAge: 60000 } }));
app.use('/', wechat(Config.Token, wechat.text(function(message, req, res) {
  console.log(message);
  var input = (message.Content || '').trim();

  if (input === '出国') {
    res.wait('query');
  } else if (input.length < 2) {
    res.reply('o(╯□╰)o 你到底想说神马捏？');
  } else if (input === '你是谁') {
    res.reply('(*^__^*) 我是小牛牛啊！');
  } else {
    res.reply('( ⊙ o ⊙ )你在说英语吗，我怎么没听懂！');
  }
  

}).location(function(message, req, res) {

}).image(function(message, req, res) {

}).voice(function(message, req, res) {

}).event(function(message, req, res) {
  if (message.Event == 'subscribe') {
    res.reply('感谢添加途牛旅游网服务号！现在可以开始和我对话啦!');
  }
})));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('listening');
});