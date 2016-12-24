

// index page
exports.index = function(req,res){
    res.render('home',{
        title: 'home page'
    });
};


exports.paper = function(req,res){
    res.render('paper/for-paper',{
        title: '验证结果'
    });
};
exports.paper_2 = function(req,res){
    res.render('paper/for-paper-2',{
        title: '验证结果'
    });
};

exports.paperAll = function(req,res) {
    console.log(req.params.id);
    res.render('paper/for-paper-'+req.params.id,{
        //title: '验证结果'
    });
};