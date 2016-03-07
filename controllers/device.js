

//设备文件
var Device = require('../models/device.js');//拿到project的模型,文件引入路径要对
var Project = require('../models/project.js');//拿到user的模型,文件引入路径要对
var _ = require('underscore');
//处理上传图片要用到的模块
var fs = require('fs');
var path = require('path');

//device page
exports.device = function(req,res){
    //console.log(req.session.project);
    var id = req.session.user._id;
    console.log(id);
    Project.find({relation:id}).exec(function(err, projects){
        if(err){
            console.log(err);
        }
        //console.log(projects);
        res.render('device/device-attach', {
            title: 'Connecting equipment',
            section_1: '添加设备',
            section_2: '查看设备',
            projects:projects
            //project:req.locals.project
        });
    });
};


exports.deviceSave = function(req,res){
    var _device = req.body.device;     //通过表单拿到数据，是一个对象
    _device.picture = req.picture;
    //console.log(req);
    //console.log(req.body);
    console.log(req.body.device.location);
    Device.findOne({name:_device.name},function(err,device){
        if(err){
            console.log(err);
        }
        if(device){
            console.log("设备名称已存在，请更换名称！");//设备名要确保唯一
        }else{//如果不存在，则生成一个新的项目
            var newDevice = new Device(_device);
            //console.log("22222");
            //console.log(newDevice);
            //这里是因为在multipart/form-data编码个试下出现错误，因此这里直接赋给实例化后的数据
            newDevice.location.longitude = req.body.device.longitude;
            newDevice.location.latitude = req.body.device.latitude;
            console.log(newDevice);
            newDevice.save(function(err,device){
                console.log("保存到数据库成功！");
                if(err){
                    console.log(err);
                }
                //req.session.project = newProject;
                //console.log(req.session.project);
            });
        }
    });
};
//处理ajax获取project._id的请求响应函数
exports.nameGet_id = function(req,res){
    var name = req.query.projectName;
    console.log(name);
    Project.findOne({name:name},function(err,project){
        if(err){
            console.log(err)
        }
        Device.find({relation:project._id}).exec(function(err,devices){
            if(err){
                console.log(err);
            }
            //console.log(project);
            //console.log(project._id);
            res.jsonp({
                id:project._id,
                devices:devices
            });
        });
    });
};


//处理项目->查看设备的页面
exports.viewDevice = function(req,res){
    var queryId = req.query.id;
    var projectName = req.query.projectName;
    //console.log(queryId);
    Device.find({relation:queryId}).exec(function(err,devices){
        if(err){
            console.log(err)
        }
        //console.log(devices);
        //console.log(devices[0].project);
        res.render('device/device-manage',{
            title:'Details of equipment management',
            devices:devices,
            num:devices.length,
            //projectName:devices[0].project//这里这样写如果该项目下边没有设备就会出错。
            projectName:projectName
        });
    });
};

//处理monitoring-center的查找device的ajax请求
exports.deviceSearch = function(req,res){
    var projectId = req.query.projectId;
    //console.log(projectId);
    Device.find({relation:projectId}).exec(function(err,devices){
        if(err){
            console.log(err);
        }
        res.jsonp({
            devices:devices
        })
    })
};

//这里处理上传设备的图片的请求
exports.savePicture = function(req, res,next) {
    console.log(req.files);
    var pictureData = req.files.devicePicture;//type="file"
    var filePath = pictureData.path;
    //var originalFilename = picrureData.originalFilename;//用于判断文件是否存在

    fs.readFile(filePath, function(err, data){
        var timestamp = Date.now();
        var type = pictureData.type.split('/')[1];
        var picture = timestamp + '.' + type;
        var newPath = path.join(__dirname, '../', '/public/upload/' + picture);
        fs.writeFile(newPath, data, function(err) {
            req.picture = picture;
            next()
        })
    });
    //next();
};

//删除设备操作
exports.deleteDevice = function(req,res){
    var _id = req.query._id;
    //console.log(2222222);
    if (_id){
        //console.log(33333333333);
        Device.remove({_id:_id}, function(err,device) {
            //console.log(device);
            if (err) {
                console.log(err);
                res.jsonp({success: 0})
            }
            else {
                res.jsonp({success: 1})
            }
            //res.render('project/project-manage',{
            //    title: '项目管理',
            //    section_1:'我的项目',
            //    section_2:'新建项目',
            //    section_3:'管理项目'
            //});
        })
    }
};
//编辑页面加载数据
exports.editDevice = function(req,res){
    var _id = req.query.deviceId;
    //console.log(2222222);
    Device.findOne({_id:_id},function(err,device){
        if(err){
            console.log(err)
        }
        //console.log(device);
        res.jsonp({
            device:device
        })
    });
};
exports.editSaveDevice = function(req,res){
    var newDevice = req.body.device;
    //console.log(newDevice);
    var _id = newDevice._id;
    Device.findOne({_id:_id}).exec(function(err,device) {
        if (err) {
            console.log(err)
        }
        //console.log(device);
        _device = _.extend(device, newDevice);//用后边的对象替换前面的对象，相同的属性就覆盖掉
        _device.meta.updateAt = new Date();//更新时间到现在
        console.log(_device);
        _device.save(function (err, device){
            if (err) {
                console.log(err)
            }
            res.render('project/project-manage',{//这里直接抬出来不太适合，但目前还没有明确的需求
                title: 'project management',
                section_1:'我的项目',
                section_2:'新建项目'
            });
        })
    })
};
