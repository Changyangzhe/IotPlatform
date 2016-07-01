




//设备文件
var DataStream = require('../models/dataStream.js');//拿到project的模型,文件引入路径要对
var DataPoint = require('../models/dataPoint.js');
//var moment = require('moment');



exports.testUpload = function(req,res) {
    var _dataStream = req.body.dataStream;     //通过表单拿到数据，是一个对象
    console.log(_dataStream);
    //DataStream.findOne({name: _dataPoint.name}, function (err, dataPoint) {
    //    if (err) {
    //        console.log(err);
    //    }
    //    if (dataPoint) {
    //        console.log("项目名称已存在，请更换名称！");
    //    } else {//如果不存在，则生成一个新的项目
            var newDataStream = new DataStream(_dataStream);
            console.log(newDataStream);
            newDataStream.save(function (err, dataStream) {
                console.log("保存到数据库成功！");
                if (err) {
                    console.log(err);
                }
                //newDataStream.createAt = new Date();
                //res.render('dataPoint',{});
                //req.session.project = newProject;
                //console.log(req.session.project);
                res.render('data-point/dataPointUploadTest',{
                    //name:newDataPoint.name,
                    //dataPointKey:newDataPoint._id
                })
            });
            //}
            //});
    //    }
    //});
};
exports.testPage = function(req,res){
    res.render('data-point/dataPointUploadTest',{

    });

};

//这里处理的是测试页面的数据
exports.showPage = function(req,res){
    //这里要想页面传递很多的数据，包括这个数据点dataPoint的一些信息，还有dataStream一些信息
    //这里用随机的一个数据点来进行测试

    var dataPointId = '569b2661c093eb101b9e54da';//利用dataStreamKey也就是数据点DataPoint的_id属性
    DataPoint.findOne({_id: dataPointId}, function (err,dataPoint) {
        if(err){
            console.log(err);
        }
        //console.log(dataPoint);

        DataStream.find({dataPointKey:dataPointId}).exec(function(err, dataStreams){
            if(err){
                console.log(err);
            }
            //console.log(dataStreams);

            res.render('data-point/showDataPoint',{
                dataPoint:dataPoint,
                dataStreams:dataStreams
            })
        });
    });
};


exports.getData = function(req,res){
    //var device_id = req.query.device_id;//当前设备的id
    var device_id = '56974d6d58a6aca80e9a9311';
    //var dataPointId = '568f48b6d2100c1c09d2ad68';//利用dataStreamKey也就是数据点DataPoint的_id属性

    DataPoint.find({relation: device_id}, function (err,dataPoints) {

        if(err){
            console.log(err);
        }
        console.log(dataPoints);

        //DataStream.find({dataPointKey:dataPointId}).exec(function(err, dataStreams){
        //    if(err){
        //        console.log(err);
        //    }
        //    console.log(dataStreams);
        //
        //    res.render('data-point/showDataPoint',{
        //        dataPoint:dataPoints,
        //        dataStreams:dataStreams
        //    })
        //});
    });
};


//监控中心获取数据
exports.dataStreamSearch = function(req,res){
    var dataPoint_id = req.query.dataPoint_id;
    //var time_range = req.query.time_range;
    //console.log(dataPoint_id);
    //console.log(time_range);

    DataPoint.findOne({_id:dataPoint_id},function (err,dataPoint) {
        if (err) {
            console.log(err);
        }
        //,{'meta.createAt':{$gte:start}}     这里不能添加这样的查询，因此要对查询结果在前端页面来进行处理
        DataStream.find({dataPointKey: dataPoint_id}).exec(function (err,dataStreams) {
            if (err) {
                console.log(err)
            }

            res.jsonp({
                dataPoint: dataPoint,
                dataStreams: dataStreams
                //moment:moment
            })
        });
    })
};