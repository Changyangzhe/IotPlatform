


var express = require('express');
//引入配置文件，配置app的端口和数据库地址，以后可能更多
var Config = require('./config.js');
//bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理.
//这个插件通常当作中间件使用，app.use(cookieParser()), 这样就可以处理每一个请求的cookie。
var bodyParser = require('body-parser');
//mongoose构建在mongodb之上，提供了Schema、Model和Document对象，用起来更为方便。
//我们可以用Schema对象定义文档的结构（类似表结构），可以定义字段和类型、唯一性、索引和验证。
//Model对象表示集合中的所有文档。Document对象作为集合中的单个文档的表示。
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
//session中间件需要单独安装,用于客户端与服务器之间的会话，保存登录信息
var session = require('express-session');
//connect-mongo是用来将connect的session持久化到mongodb中的
var mongoStore = require('connect-mongo')(session);
//主要功能是：在服务器控制台中，显示req请求的信息。提供自动日志记录支持。
var morgan = require('morgan');
////向响应中添加X-Response-Time头，提供毫秒级为单位的响应时间
//var resTime = require('response-time');

//实现文件上传，最简单的做法是通过“connect-multiparty”中间件实现上传。
var multipart = require('connect-multiparty');

//用于设置查找的资源路径，样式文件路径
var path = require('path');

var app = express();

// app.locals - global  用于格式化时间数据
//app.locals.moment = require('moment');
var moment = require('moment');
//创建数据库连接，数据库名字imooc，端口localhost:27031
mongoose.connect(Config.dataBase);

app.use(multipart());
// use body-parser to grab infor from POST
// 通常 POST 内容的格式是 application/x-www-form-urlencoded, 因此要用下面的方式来使用：
// 将表单中的数据进行一个格式化 parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());//下边session正常工作的条件
// session and cookie Parser
app.use(cookieParser());
app.use(session({//添加配置项
    secret:'Iot',
    store: new mongoStore({//用来存储会话
        url:Config.dataBase,
        collection:'sessions'
    })
}));
// set up handlebars view engine
var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        moment:function (date, options) {//草，终于搞好了，终于会写helpers函数了
            var formatStr = options.hash.format || 'YYYY-MM-DD hh:mm:ss a';
            return new moment(date).format(formatStr);
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//用于支持静态资源
app.use(express.static(__dirname + '/public'));

// config APP entry file
//env 运行时环境，默认为 process.env.NODE_ENV 或者 "development"
//app.locals：这是一个函数对象，可以给它增加新的属性。
//程序内所有页面模板都能访问这个对象，所以可以用它保存全局配置变量供页面模板使用。
if('development'===app.get('env')){//如果当前环境下的配置,开发环境下development
    app.set('showStackError',true);//显示堆栈错误
    app.use(morgan(':method:url:status'));//记录请求信息
    app.locals.pretty = true;//告诉创建的模板要正确缩进
    // mongoose.set('debug',true);
}

//引入文件  pass APP to the route !
require('./routes')(app);

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

//监听端口  listen to port
app.listen(Config.port, function(){
    console.log( 'Express started on http://localhost:' +
    Config.port + '; press Ctrl-C to terminate.' );
});

