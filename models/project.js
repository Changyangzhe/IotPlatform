

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ProjectSchema = new mongoose.Schema({  //���ݿ�ģʽ
    name:{
        unique:true,
        type:String,
        required:true
    },
    descript:String,
    relation:{
        type:ObjectId,
        ref:'User'
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
ProjectSchema.pre('save',function(next){//Ϊ����ģ����ӷ�����ÿ�ζ�ִ�еĺ������洢����,middleware��ʵ����������ʵ����ҲҪִ�е�
    //var project = this;
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();  // ������������,�����д�˸�next();
});

// statics
ProjectSchema.statics = {   //��̬������������ģ��ʵ�����Ժ�Ż��еķ���   ģ�ͷ���  �෽��
    fetch:function(cb){
        return this   //����ȡ��Ŀǰ���ݿ������е����ݲ��Ұ�����ʱ������
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById:function(id,cb){
        return this   //����ȡ�����ݿ��е������ݲ��Ұ�����ʱ������
            .findOne({_id:id})
            .exec(cb);
    }
};

module.exports = mongoose.model('Project',ProjectSchema);//��������캯������