

module.exports = function(grunt){
	//Project config
	grunt.initConfig({
		//watch 监控文件变更，从而来重启服务
		watch:{
			handlebars:{   //监听handlebars变更，来重启服务
				files:'*.handlebars',
				options:{
					livereload:true   //文件改动以后重新启动服务
				}
			},
			js:{  //监听文件变更，重启服务
				files:['public/**','models/*.js','controllers/*.js','app.js','Gruntfile.js'],
				options:{
					livereload:true
				}
			},
			uglify:{//uglify是一个文件压缩插件
				files:['public/**/*.js'],
				tasks:['jshint'],
				options:{
					livereload:true
				}
			},
			styles:{
				files:['public/**/*.less'],
				tasks:['less'],
				options:{
					nospawn:true
				}
			}

		},
		//jshint
		jshint:{ //检查js的语法有没有错误
			options:{
				jshintrc:'.jshintrc',
				ignores:['public/assets/libs/**/*.js']
			}
			//all: ['public/assets/js/*.js','test/**/*.js','app/**/*.js','app.js']
		},
		//less
		less:{
			development:{
				options:{
					compress:true,
					yuicompress:true,
					optimization:2
				}
				//files:{
				//    'public/build/index.css':'public/build/index.less'
				//}
			}
		},
		//uglify
		uglify:{
			development:{
				//files:{
				//	'public/build/admin.js':'public/assets/js/main.js',
				//	// detail.js
                //
				//}
			}
		},
		//nodemon
		nodemon:{
			dev:{
				options:{
					file:'app.js',
					args:[],
					ignoredFiles:['README.md','node_modules/**','.DS_Store'],
					watchedExtensions:['js'],
					watchedFolder:['./'],
					debug:true,
					delayTime:1,
					env:{
						PORT:3000
					},
					cwd:__dirname
				}
			}
		},
		//mochaTest
		mochaTest:{
			options:{
				reporter:'spec'
			},
			src:['test/**/*.js']
		},
		//concurrent
		concurrent:{
			// miss uglify
			tasks:['nodemon','watch','less','jshint'],
			options:{
				logConcurrentOutput:true
			}
		}

	});

	// Load plugins  任务模块
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default tasks 注册任务
	grunt.option('force',true);
	grunt.registerTask('default',['concurrent']);
	grunt.registerTask('test',['mochaTest']);
};
