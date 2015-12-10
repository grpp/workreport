// Requirements
var gulp = require('gulp'),
	install = require('gulp-install'),
	rimraf = require('rimraf'),
	jshint = require('gulp-jshint');

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
}

// Gulp task
/*
	Takes 2 or 3 arguments:
	- name of the task
	- function that will be run when you call the task
	- optional arguments is dependencies [runTask, [, task2[, ...]]]
	  these are the the different task to run 
	  (this is the second argument making the callback function the third argument)
*/
gulp.task('default', ['watch:src']);

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
});

// Remove all files within the build folder
gulp.task('clean', function(cb){
	rimraf(folder.build, cb);
});