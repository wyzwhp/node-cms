/**
 * admin 入口文件
 * 
 */
var express = require('express'),
	fs = require('fs'),
	http = require('http');
var app = express();
/*var static_dir =  ;
app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
})

if (process.env.NODE_ENV == "production") {
	var one_year = 31557600000;
	app.use(express.static(static_dir, {
		maxAge: one_year
	}));
} else {
	app.use(express.static(static_dir));
};*/
module.exports.app = app;