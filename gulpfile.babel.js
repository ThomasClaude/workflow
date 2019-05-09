/* eslint-disable max-len */

import gulp from 'gulp';
import connect from 'gulp-connect';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import pug from 'gulp-pug';
import chalk from 'chalk';
import imagemin from 'gulp-imagemin';
import bulkSass from 'gulp-sass-bulk-import';
import gutil from 'gulp-util';
import browserify from 'gulp-browserify';

sass.compiler = require('node-sass');

// Variables related to dir

const srcDir = 'src/';
const distDir = 'dist/';

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
  console.log(chalk.bgHex('#2e67d7').hex('#ffffff')('✌️ Hello, this workflow was made by'), chalk.bold.bgHex('#51a982').hex('#ffffff')(' www.thomasclaude.dev '));
  console.log(chalk.bgHex('#2e67d7').hex('#ffffff')('I am glad to see that you are using it and hope you enjoy it.'));
  console.log(chalk.bold.bgHex('#f30f69').hex('#ffffff')('If you have any reports/bug you can send me a mail at coffee@thomasclaude.be ✌️ '));
});


// Live reload, watching all files and if change call another gulp task.

gulp.task('watch', () => {
  gulp.watch(`${srcDir}views/*.pug`, ['views']);
  gulp.watch(`${srcDir}assets/components/*/*.pug`, ['views']);
  gulp.watch(`${srcDir}assets/components/*`, ['views']);
  gulp.watch(`${srcDir}*.html`, ['html']);
  gulp.watch(`${srcDir}assets/styles/scss/*`, ['css']);
  gulp.watch(`${srcDir}assets/styles/scss/*/*`, ['css']);
  gulp.watch(`${srcDir}assets/styles/scss/components/*/*`, ['css']);
  gulp.watch(`${srcDir}assets/scripts/*.js`, ['compileJs']);
  gulp.watch(`${srcDir}assets/scripts/*/*.js`, ['compileJs']);
  gulp.watch(`${srcDir}assets/images/*`, ['compileAssets']);
});


// Other tasks called by live reload.

/*
 * After checking if changes has been done in the scss
 * file then compiling and putting it on the dist as css file.
 */

gulp.task('compileSass', () =>
  gulp.src(`${srcDir}assets/styles/scss/*.*ss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${distDir}assets/styles/`))
    .pipe(connect.reload())
);

gulp.task('css', () => {
  gulp
    .src(`${srcDir}assets/styles/scss/main.scss`)
    .pipe(bulkSass())
    .pipe(
      sass({
        includePaths: ['src/styles/scss/*'],
      }))
    .on('error', sass.logError)
    .pipe(gulp.dest(`${distDir}assets/styles/`))
    .pipe(connect.reload());
});

/*
 * After checking if changes has been done in the image
 * file then compiling and putting it on the dist.
 */

gulp.task('compileAssets', () =>
  gulp.src(`${srcDir}assets/images/*`)
    .pipe(imagemin([
      imagemin.svgo({ plugins: [{ removeViewBox: true }] }),
    ], {
      verbose: true,
    }))
    .pipe(gulp.dest(`${distDir}assets/images`))
    .pipe(connect.reload())
);


/*
 * After checking if changes has been done in the script file
 * then compiling ES6 to javascript it on the dist.
 */

gulp.task('compileJs', () =>
  gulp.src(`${srcDir}assets/scripts/*.js`)
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production,
    }))
    .pipe(gulp.dest(`${distDir}assets/scripts/`))
    .pipe(connect.reload())
);

/*
 * After checking if changes has been done in the views file
 * then compiling pug to html it on the dist.
 */

gulp.task('views', () => {
  gulp.src(`${srcDir}views/*.pug`)
    .pipe(pug())
    .on('error', gutil.log)
    .pipe(gulp.dest(distDir))
    .pipe(connect.reload());
});

gulp.task('html', () =>
  gulp.src(`${srcDir}*.html`)
    .pipe(gulp.dest(distDir))
    .pipe(connect.reload())

);

// Creating a webserver from the dist file on the 8080 port

gulp.task('connect', () => {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8080,
  });
});

gulp.task('default', ['hello', 'connect', 'watch']);


