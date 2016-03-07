

//用户登录与注册页面
var User = require('../models/user.js');//拿到user的模型,文件引入路径要对

//showSignup
exports.signupPage = function (req,res){
    res.render('user/sign-up',{            //返回列表页，使用使用localhost:3000/admin/list 来访问
        title:'sign up'        //此处的title变量会替换jade模板中的变量
    })
};//直接调用实例的get方法

//showSignin
exports.signinPage = function (req,res){
    res.render('user/sign-in',{            //返回列表页，使用使用localhost:3000/admin/list 来访问
        title:'sign in'             //此处的title变量会替换jade模板中的变量
        //users:users
    })
};//直接调用实例的get方法

//signup  注册页面  数据保存
exports.signup = function(req,res){
    var _user = req.body.user;//通过表单拿到数据，是一个对象，req.param('user")也可以拿到这个提交的信息
    User.findOne({name:_user.name},function(err,user){
        if(err){
            console.log(err);
        }
        if(user){//这里的user是一个数组，应该来判断数组的长度来判断是否为空，如果用户存在，就重定位到登陆页面
           //console.log(user);
            req.session.user = true;
            return res.redirect('/user/sign-in');
        }else{//如果不存在，则生成一个新的用户
            var newUser = new User(_user);
            console.log(newUser);
            newUser.save(function(err,user){
                if(err){
                    console.log(err);
                }
                req.session.user = newUser;//此处设置注册完后直接登录
                res.redirect('/');
            });
        }
    });
};

//signin  登录页面 比对密码
exports.signin = function(req,res){
    var _user = req.body.user;//拿到登陆提交的信息
    var name = _user.name;
    var password = _user.password;//登陆的时候填写的密码
    User.findOne({name:name},function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){//用户不存在的时候切换到注册页面
            return res.redirect('/user/sign-up');
        }
        //数据库中存的是经过加密的密码
        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err);
            }
            if(isMatch){
                req.session.user = user;//如果可以匹配就更换req.session.user
                return res.redirect('/');
            }else{
                console.log('PassWord is not matched.');
                return res.redirect('/user/sign-in');
            }
        });
    });
};

//logout 登出页面
exports.logout = function(req,res){
    delete req.session.user;//这里删除登陆，退出登录
    //delete app.locals.user;
    res.redirect('/');
};

//userList page  用户注册的列表
exports.list = function (req,res){
    User.fetch(function(err,users){         //读取数据库中users表所有的user
        //console.log(users);
        if(err){
            console.log(err);
        }
        res.render('user/user-list',{       //返回列表页，使用使用localhost:3000/admin/list 来访问
            title:'user list',              //此处的title变量会替换jade模板中的变量
            users:users                     //拿到所有的user数据
        })
    })
};//直接调用实例的get方法

//midware for user   用户登陆状态的确定
exports.signinRequired = function(req,res,next){
    var user = req.session.user;
    if(!user){
        return res.redirect('user/sign-in');
    }
    next();//写中间件记着需要最后的next，以便执行下一步的操作
};

//midware for user  用户权限的确定
exports.adminRequired = function(req,res,next){
    var user = req.session.user;
    if(user.role<=10){
        return res.redirect('user/sign-in');
    }
    next();
};
//执行删除用户的操作
exports.deleteUser = function(req,res){
    var _id = req.query.id;
    User.remove({_id:_id},function(err,user){
        if (err) {
            console.log(err);
        }
        if (err) {
            console.log(err);
            res.json({success: 0})
        }
        else {
            res.json({success: 1})
        }
    })
};
