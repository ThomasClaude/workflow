const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const chalk = require('chalk');
const imagemin = require('gulp-imagemin');


/*
 * With this gulp file you are able to
 * Compiling Sass/ES6/Pug/Images
 * Putting on your files after compile in dist folder
 * Having a webserver with livereload on custom port
 *
 * This is a informative sentence, you're not supposed to remove it.
 * Hope you will respect my wokr.
 */

gulp.task('hello', () => {
  console.log(chalk.bgHex('#2e67d7').hex('#ffffff')('✌️ Hello, this workflow was made by'), chalk.bold.bgHex('#51a982').hex('#ffffff')(' www.thomasclaude.be ') );
  console.log(chalk.bgHex('#2e67d7').hex('#ffffff')('I am glad to see that you are using it and hope you enjoy it.'));
  console.log(chalk.bold.bgHex('#f30f69').hex('#ffffff')('If you have any reports/bug you can send me a mail at coffee@thomasclaude.be ✌️ '));
});


// Live reload, watching all files and if change call another gulp task.

gulp.task('watch', () => {
  gulp.watch('./src/views/*.pug', ['views']);
  gulp.watch('./src/assets/components/*/*.pug', ['views']);
  gulp.watch('./src/assets/components/*', ['views']);
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/assets/styles/scss/*', ['compileSass']);
  gulp.watch('./src/assets/styles/scss/*/*', ['compileSass']);
  gulp.watch('./src/assets/scripts/js/*.js', ['compileJs']);
  gulp.watch('./src/assets/scripts/js/*/*.js', ['compileJs']);
  gulp.watch('./src/assets/images/*', ['compileAssets']);
});


// Other tasks called by live reload.

/*
 * After checking if changes has been done in the scss
 * file then compiling and putting it on the dist as css file.
 */

gulp.task('compileSass', () =>
  gulp.src('./src/assets/styles/scss/*.*ss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/styles/'))
    .pipe(connect.reload())
);

/*
 * After checking if changes has been done in the image
 * file then compiling and putting it on the dist.
 */

gulp.task('compileAssets', () =>
  gulp.src('./src/assets/images/*')
    .pipe(imagemin([
      imagemin.svgo({ plugins: [{ removeViewBox: true }] }),
    ], {
      verbose: true,
    }))
    .pipe(gulp.dest('./dist/assets/images'))
    .pipe(connect.reload())
);


/*
 * After checking if changes has been done in the script file
 * then compiling ES6 to javascript it on the dist.
 */

gulp.task('compileJs', () =>
  gulp.src('./src/assets/scripts/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist/assets/scripts/js'))
    .pipe(connect.reload())
);

/*
 * After checking if changes has been done in the views file
 * then compiling pug to html it on the dist.
 */

gulp.task('views', () => {
  return gulp.src('./src/views/*.pug')
    .pipe(pug({
      // Your options in here.
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload())
});

gulp.task('html', () =>
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload())

);

// Creating a webserver from the dist file on the 8080 port

gulp.task('connect', () => {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8080
  });
});

gulp.task('default', ['hello', 'connect', 'watch']);