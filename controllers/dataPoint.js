




//设备文件
var DataPoint = require('../models/dataPoint.js');//拿到project的模型,文件引入路径要对
var Device = require('../models/device.js');
var Project = require('../models/project.js');


exports.saveDataPoint = function(req,res) {
    console.log(req.body);
    var _dataPoint = req.body.dataPoint;     //通过表单拿到数据，是一个对象
    DataPoint.findOne({name: _dataPoint.name}, function (err,dataPoint) {
        if (err) {
            console.log(err);
        }
        if (dataPoint) {
            console.log("项目名称已存在，请更换名称！");
        } else {//如果不存在，则生成一个新的项目
            var newDataPoint = new DataPoint(_dataPoint);
            newDataPoint.save(function (err, dataPoint) {
                console.log("保存到数据库成功！");
                if (err) {
                    console.log(err);
                }
                //res.render('dataPoint',{});
                //req.session.project = newProject;
                //console.log(req.session.project);
                res.render('data-point/data-point-create-success',{
                    title:'The data node created successfully',
                    name:newDataPoint.name,
                    descript:newDataPoint.descript,
                    dataPointKey:newDataPoint._id
                    })
            });
        }
    });
};

//创建数据节点页面加载
exports.createDataPoint = function(req,res){
    var userId = req.session.user._id;
    //console.log(res.body);
    //console.log(userId);
    Project.find({relation:userId}).exec(function(err, projects){
        if(err){
            console.log(err);
        }
        //console.log(projects);
        res.render('data-point/data-point-creat', {
            title: 'create a data point',
            projects:projects
        });
    });
};



//监控中心的页面加载
exports.monitoringCenter = function(req,res){
    //这里需要直接传给页面用户下的项目信息
    var userId = req.session.user._id;
    Project.find({relation:userId}).exec(function(err, projects) {
        if (err) {
            console.log(err);
        }
        res.render('monitoring-center', {
            title: 'monitoring center',
            projects:projects
        });
    });
};
//监控页面加载dataPoint的信息数据
exports.dataPointSearch = function(req,res){
    var deviceId = req.query.deviceId;
    DataPoint.find({relation:deviceId}).exec(function(err,dataPoints){
        if(err){
            console.log(err)
        }
        //console.log(dataPoints);
        res.jsonp({
            dataPoints:dataPoints
        })
    });
};

//查询数据节点的信息
exports.viewDataPoint = function(req,res){
    //这里需要直接传给页面用户下的项目信息
    var userId = req.session.user._id;
    Project.find({relation:userId}).exec(function(err, projects) {
        if (err) {
            console.log(err);
        }
        res.render('data-point/data-point-view', {
            title: 'view data point',
            projects:projects
        });
    });
};