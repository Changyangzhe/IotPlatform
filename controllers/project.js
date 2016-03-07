

//项目文件
var Project = require('../models/project.js');//拿到project的模型,文件引入路径要对
var _ = require('underscore');

//device page
exports.project = function(req,res){
    res.render('project/project-manage',{
        title: 'project management',
        section_1:'我的项目',
        section_2:'新建项目'
    });
};

exports.newProject = function(req,res){
    var _project = req.body.project;//通过表单拿到数据，是一个对象
    Project.findOne({name:_project.name},function(err,project){
        if(err){
            console.log(err);
        }
        if(project){
            console.log("项目名称已存在，请更换名称！");
        }else{//如果不存在，则生成一个新的项目
            var newProject = new Project(_project);
            newProject.save(function(err,project){
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

exports.getProject = function(req,res) {
    var userId = req.session.user._id;
    console.log(userId);
    //var TransferObject = new Object();
    Project.find({relation: userId}).exec(function (err, projects) {
        //console.log(projects);//这里的到的projects是一个以project为元素的数组
        //console.log(projects[0]._id);
        //TransferObject.num = projects.length;
        //console.log(TransferObject);
        res.jsonp({
            projects: projects
        })
    });
};
// admin post movie
exports.editProject = function(req,res){
    var newProject = req.body.project;
    //console.log(newProject);
    var _id = newProject._id;

    Project.findOne({_id:_id}).exec(function(err,project){
        if (err) {
            console.log(err)
        }
        //console.log(project);
        _project = _.extend(project,newProject);//用后边的对象替换前面的对象，相同的属性就覆盖掉
        _project.meta.updateAt = new Date();//更新时间到现在
        _project.save(function(err, project) {
            if (err) {
                console.log(err)
            }
            res.render('project/project-manage',{
                title: 'project management',
                section_1:'我的项目',
                section_2:'新建项目'
            });
        })
    });
};

exports.deleteProject = function(req,res){
    var _id = req.query._id;
    //console.log(2222222);
    if (_id){
        //console.log(33333333333);
        Project.remove({_id:_id}, function(err,project) {
            //console.log(project);
            if (err) {
                console.log(err);
                res.json({success: 0})
            }
            else {
                res.json({success: 1})
            }
        })
    }
};

