"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');
var exec = require('child_process').exec;


gulp.task('default', ['js', 'lint', 'watch', 'run']);


gulp.task('run', function (){
	exec('node server.js', function(error, stdout, stderr) {
		if(error) console.log(error);
		if (stdout) console.log(stdout);
		if (stderr) console.log(stderr);
	});
	console.log('=============== Server running on localhost:9003 ==================');
});

gulp.task('js', function () {
	return browserify({
			entries: './src/app.js',
			debug: true
		})
		.transform("babelify", {presets: ["node6", "react", "stage-0"]}, {plugins: ["transform-object-rest-spread"]})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./'))
});

gulp.task('lint', function() {
	return gulp.src('./src/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
});

gulp.task('watch', function () {
	gulp.watch('./src/**/*.js', ['js', 'lint'])
});