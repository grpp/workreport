// Requirements
var gulp = require('gulp'),
	install = require('gulp-install'),
	rimraf = require('rimraf'),
	jshint = require('gulp-jshint'),
	connect = require('gulp-connect'),
	gutil = require('gulp-util');

// List of files to watch for
var files = {
	html: [
		'./src/',
	],
	css: [
		'./src/css/*.css',
	],
	javascript: [
		'./src/js/*.js',
	],
	resources: [
		'./src/img/bmp/*.bmp',
		'./src/img/jpg/*.jpg',
		'./src/img/png/*.png',
		'./src/img/svg/*.svg',
	],
	svg: [
		'./src/img/svg/*.svg',
	],
	srcDir: './src/**/*'
}

var folder = {
	build: './build',
	src: './src',
	html: './src/html',
	js: './src/js',
	img: './src/img'
}

/*
	Values to ignore while linting js files.
	Includes namespace and other specifics to the
	Dev evironment.
*/
var jsGlobals = {
	console: false
}

// Gulp task
/*
	Takes 2 or 3 arguments:
	- name of the task
	- function that will be run when you call the task
	- optional arguments is dependencies [runTask, [, task2[, ...]]]
	  these are the the different task to run 
	  (this is the second argument making the callback function the third argument)

  	To run notify that a function is finished such that the next can be run
*/
gulp.task('default', ['debug']);

// default linter
gulp.task('lint', function(){
	gulp.src('./src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// Watch src file changes
gulp.task('watch:src', function(){
	// Watch changes in the src folder
	gulp.watch('./src/**/*.js', ['lint']);
});

// Install dev dependencies
gulp.task('install', function(){
	gulp.src(['./package.json', './bower.json'])
		.pipe(install());
});

// Add files to your build directory such that only files that pass
// linter will show cause the website to reload
gulp.task('build', function(){
	// make sure to add files
	gulp.src(files.srcDir)
		.pipe(gulp.dest(folder.build));

	gulp.src('./bower_components/**/*')
		.pipe(gulp.dest('./src/thirdParty'))
		.pipe(gulp.dest('./build/thirdParty'));
});

// Remove all files within the build folder
gulp.task('clean', function(cb){
	rimraf(folder.build, cb);
});

gulp.task('reload-site', function(){
	gulp.src(folder.build + '/*.html')
		.pipe(connect.reload());
});

gulp.task('start-server', function(cb){
	connect.server({
		port: 8765,
		root: folder.build,
		livereload: true
	});
	cb();
});

gulp.task('debug-watch', ['start-server'], function(){
	gulp.watch('./src/**/*.js', ['debug-lint:js', 'debug-build', 'debug-reload']);

	// Add watch for html files using html-hint
});

gulp.task('debug-lint:js', function(cb){
	gulp.src('./src/**/*.js')
		.pipe(jshint({
			undef: true,
			unused: "vars",
			browser: true,
			globals: jsGlobals
		}))
		.on('error', gutil.log)
		.pipe(jshint.reporter('jshint-stylish'))
		.on('error', gutil.log);

	cb();
});

gulp.task('debug-build', ['debug-lint:js'], function(cb){
	gulp.src(files.srcDir)
		.pipe(gulp.dest(folder.build));

	cb();
});

gulp.task('debug-reload', ['debug-lint:js', 'debug-build'], function(){
	gulp.src(folder.build + '/*.html')
		.pipe(connect.reload());
});

gulp.task('debug', ['start-server', 'debug-watch']); 