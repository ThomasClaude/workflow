var gulp = require('gulp');
var connect = require ("gulp-connect");
var sass = require('gulp-sass');


//dossier dev
//validation html/css
//sass
//fichiers de travail
//dossier prod
//prefixer css
//concat js, css
//minifier js, css
//compresser auto vos images

gulp.task('hello', function(){
	console.log("hello world")
});

//rafraichir
gulp.task('watch', function(){
	gulp.watch("*.html", ["html"])
	gulp.watch("./_assets/_scss/*.scss", ["compileSass"])
	gulp.watch("./_assets/_js/*.js", ["js"]);
	
});


//Live reload

gulp.task("compileSass", function(){
	return gulp.src("./_assets/_scss/*.*ss")
	.pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./_dist/_assets/_css'))
	.pipe(gulp.dest('./_assets/_css'))
	.pipe(connect.reload());
	
});
gulp.task("js", function(){
	return gulp.src("./_assets/_js/*.js")
	.pipe(gulp.dest('./_dist/_assets/_js'))
	.pipe(gulp.dest('./_assets/_js'))
	.pipe(connect.reload());
	
});
gulp.task("html", function(){
	return gulp.src("*.html")
	.pipe(gulp.dest('./_dist/'))
	.pipe(gulp.dest('./'))
	.pipe(connect.reload());
	
});

gulp.task("connect", function(){
	connect.server({
		root: [__dirname],
		livereload: true,
		port: 8080
	});
});

gulp.task("default", ["connect", "watch"]);