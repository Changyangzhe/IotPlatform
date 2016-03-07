


var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var ObjectId = mongoose.Schema.Types.ObjectId;

var DataPointSchema = new mongoose.Schema({  //数据库模式

    name:{
        unique:true,
        type:String,
        required:true
    },
    descript:{
        type:String,
        required:false
    },
    value:{
        type:{
            type:String,
            require:true
        },
        numericalUnit:{
            type:String,
            require:true
        }
    },
    range:{
        max:{
            type:Number,
            require:false,
            default:100
        },
        min:{
            type:Number,
            require:false,
            default:0
        }
    },
    cycle:{//上传数据的周期
        type:Number,
        require:true
    },
    relation:{//关联dataPoint到设备的_id
        type:ObjectId,
        required:true
    },
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
DataPointSchema.pre('save',function(next){//为数据模型添加方法，每次都执行的函数，存储数据,middleware，实例方法，不实例化也要执行的
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
DataPointSchema.statics = {   //静态方法，对数据模型实例化以后才会有的方法   模型方法  类方法
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

module.exports = mongoose.model('DataPoint',DataPointSchema);//将这个构造函数导出