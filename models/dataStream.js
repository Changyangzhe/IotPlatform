











var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var ObjectId = mongoose.Schema.Types.ObjectId;


var DataStreamSchema = new mongoose.Schema({  //数据库模式

    value:{
        type:Number,
        default: 0
    },
    dataPointKey:{
        type:ObjectId,
        require:true
    },

    //email:{
    //    unique:true,
    //    type:String,
    //    required:true
    //},
    //0:normal user
    //1:verified user
    //2:professonal user
    //>10:admin
    //>50:super admin
    //role:{
    //    type:Number,
    //    default:51            //权限设置
    //},                        // user /admin /super admin

    //createAt:{//默认上传保存到数据库的时间就为这条数据的生成的时间
    //    type:Date,
    //    default:Date.now()
    //}
    meta:{//这里出现的问题，开始的时候只使用createAt属性，不能的到正确的时间，每次感觉都有缓存一样，最后还是把updateAt时间加上，时间是正常了，但是下边的时间是没用的。
        createAt:{//默认上传保存到数据库的时间就为这条数据的生成的时间
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }

});


//Middleware!
DataStreamSchema.pre('save',function(next){//为数据模型添加方法，每次都执行的函数，存储数据,middleware，实例方法，不实例化也要执行的
    //var project = this;
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    //bcrypt.hash(user.password,null,null,function(err,hash){//此处的参数是四个，最后一个是callback
    //    if(err){
    //        return next(err);
    //    }
    //    user.password = hash;// 将得到的结果保存到user.password,经过这里以后到的数据密码被加密了
    //    // MUST !!! USE !!! next()!中间件处理过的，需要用next传给下个操作
    //    next();
    //});
    // MUST !!! USE !!! next()!CCC
    next();  // 错误发生在这里,这里多写了个next();
});
// statics
DataStreamSchema.statics = {   //静态方法，对数据模型实例化以后才会有的方法   模型方法  类方法
    fetch:function(cb){
        return this   //用于取出目前数据库中所有的数据并且按更新时间排序
            .find({})
            .sort('meta.createAt')
            .exec(cb);
    },
    findById:function(id,cb){
        return this   //用于取出数据库中单条数据并且按更新时间排序
            .findOne({_id:id})
            .exec(cb);
    }
};

module.exports = mongoose.model('DataStream',DataStreamSchema);//将这个构造函数导出