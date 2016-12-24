

//Controller
var Index = require('./controllers/index');
var User = require('./controllers/user');
var Device = require('./controllers/device');
var Project = require('./controllers/project');
var DataPoint = require('./controllers/dataPoint');
var DataStream = require('./controllers/dataStream');


//这里的路由最后再写，放在在入口文件里边便于调试
module.exports = function(app){//在这个地方进行路由的分配和处理
   //预处理一下 pre handle user   //use就相当于一个过滤器
    app.use(function(req,res,next){//参数顺序不要写反
        var _user = req.session.user;//读取缓存验证权限
        app.locals.user = _user;//替换本地变量
        next();
    });
    //保存数据  post:接受数据的地址  PUT request to    一般获取get：需要获取数据的地址 GET request to  (path, callback [, callback ...])

    //index
    app.get('/',Index.index);//T

    //user
    app.post('/user/sign-up',User.signup);
    app.post('/user/sign-in',User.signin);
    app.get('/user/sign-in',User.signinPage);
    app.get('/user/sign-up',User.signupPage);
    app.get('/user/log-out',User.logout);
    app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list);//利用中间键控制登陆与权限管理//T
    app.delete('/admin/user/delete',User.deleteUser);

    //project
    app.get('/project/project-manage',Project.project);
    app.post('/project/new-project',Project.newProject);
    app.get('/project/getProjects',Project.getProject);
    app.post('/project/edit-project',Project.editProject);//编辑项目的post请求
    app.delete('/project/delete-project',Project.deleteProject);//ajax请求来删除

    //device
    app.get('/device/device-attach',Device.device);
    app.post('/device/newDevice',Device.savePicture,Device.deviceSave);
    app.get('/deviceGetProject',Device.nameGet_id);
    app.get('/device/view',Device.viewDevice);//通过项目来查看设备的信息
    app.get('/device/device-search',Device.deviceSearch);
    app.delete('/device/delete-device',Device.deleteDevice);//执行编辑项目->删除操作
    app.get('/device/device-edit',Device.editDevice);//加载编辑设备页面
    app.post('/device/edit-device-save',Device.editSaveDevice);

    //dataPoint
    app.post('/data-point/data-point-save',DataPoint.saveDataPoint);//保存数据节点的创建信息
    app.get('/data-point/data-point-create',DataPoint.createDataPoint);//创建数据节点的页面
    app.get('/data-point/data-point-search',DataPoint.dataPointSearch);
    app.get('/data-point/data-point-view',DataPoint.viewDataPoint);

    //dataStream
    app.post('/testStream/dataValue',DataStream.testUpload);
    app.get('/dataPointUploadTest',DataStream.testPage);
    app.get('/showDataPoint',DataStream.showPage);
    app.get('/data-stream/get-data',DataStream.getData);//ajax获取数据
    app.get('/data-stream/data-stream-search',DataStream.dataStreamSearch);// 监控中心获取数据流

    //监控中心
    app.get('/monitoring-center',DataPoint.monitoringCenter);


    //新更改2016.7.4
    //app.post('/devices/:id/data-points',DataStream.ajaxDataPointUpload);
    //测试多条数据的ajax提交的接口
    app.post('/devices/:id',DataStream.ajaxDataPointsUpload);


    //用于写论文的用处,主要举的例子，用于一个节点的多组数据的上传
    //app.post('/devices/:id',DataStream.uploadData);
    //单页面，用于模拟结果
    app.get('/paper/for-paper',Index.paper);
    app.get('/paper/for-paper-2',Index.paper_2);
    app.get('/paper/for-paper/:id',Index.paperAll);
};

