/**
 * 项目入口文件
 * @type {[type]}
 */
var express = require('express'),
	vhost = require('vhost'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	fs = require('fs'),
	https = require('https');
var app = express(),
	locals = {
		env: {
			port: process.env.PORT, //项目启动端口
			isDev: process.env.NODE_ENV !== 'production' //是否开发环境
		},
		hosts: process.env.NODE_ENV !== 'production' ? {
			///"www": "www.51ulu.local",
			"admin": "admin.51ulu.local",
			"cdn": "cdn.51ulu.local"
		} : {
			///"www": "www.51ulu.com",
			"admin": "admin.51ulu.com",
			"cdn": "cdn.51ulu.com"
		},
		pass: {
			form_pass: "",
			cook_pass: ""
		}
	}; //app 级全局变量
app.locals = locals;
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
//app.use(multer()); // for parsing multipart/form-data
var host = locals.hosts;
//遍历各个子域名的启动文件
for (var key in host) {
	var name = host[key],
		path = './server/' + key;

	domain = require(path).app;
	//记录模板应用级变量
	domain.locals = locals;
	app.use(vhost(name, domain));
	if (process.env.PORT != "80") {
		host[key] += ":" + process.env.PORT
	}
}
if (locals.env.isDev) {
	app.use(logger('dev'));
}
app.listen(locals.env.port);
module.exports = app;