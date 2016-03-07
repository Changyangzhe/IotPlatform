




var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var ObjectId = mongoose.Schema.Types.ObjectId;


var DeviceSchema = new mongoose.Schema({  //数据库模式

    name:{
        unique:true,
        type:String,
        required:true
    },
    project:{//哈希函数生成密码输出长度一样，不可逆，hash 加盐
        type:String,
        required:true
    },
    descript:String,
    relation:{
        type:ObjectId,
        ref:'Project'
    },
    location:{
        longitude:{
            type:String,
            required:true
        },
        latitude:{
            type:String,
            required:true
        }
    },
    position:{
        type:String,
        required:true
    },
    picture:String,
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
    meta:{
        createAt:{
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
DeviceSchema.pre('save',function(next){//为数据模型添加方法，每次都执行的函数，存储数据,middleware，实例方法，不实例化也要执行的
    //var project = this;
    console.log(this.isNew);
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
DeviceSchema.statics = {   //静态方法，对数据模型实例化以后才会有的方法   模型方法  类方法
    fetch:function(cb){
        return this   //用于取出目前数据库中所有的数据并且按更新时间排序
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById:function(id,cb){
        return this   //用于取出数据库中单条数据并且按更新时间排序
            .findOne({_id:id})
            .exec(cb);
    }
};

module.exports = mongoose.model('Device',DeviceSchema);//将这个构造函数导出