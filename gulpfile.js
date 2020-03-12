const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const compass = require('gulp-compass');
const miniHtml = require('gulp-minify-html');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;


let jsSources = ['components/scripts/**/*.js'];
let sassSources = ['components/sass/*.scss'];


//Concantenate all JS files partial and pipe to 'development'
function concatFiles(cb) {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(gulp.dest('builds/development/js'));
    cb();
}

//compile sass into css and pipe it to 'development'
function sass(cb) {
  gulp.src(sassSources)
  .pipe(compass({
    sass: 'components/sass',
    image: 'builds/development/images',
    style: 'expanded'
  }))
  .on('error', gutil.log)
  .pipe(gulp.dest('builds/development/css'))
  cb();
}

//compile es6 into es5 with babel

function compileES6(cb){
  gulp.src('components/scripts/concatenatedScripts/*.js')
      // Stop the process if an error is thrown.
      // .pipe(plumber())
      // Transpile the JS code using Babel's preset-env.
      .pipe(babel({
        presets: [
          ['@babel/env', {
            modules: false
          }]
        ]
      }))
      // Save each component as a separate file in dist.
      .pipe(gulp.dest('builds/development/js'));
  cb();
}

function uglifyJs(cb) {
  gulp.src('builds/development/js/*js')
  .pipe(uglify())
  .pipe(gulp.dest('builds/dist/js/'))
  cb();
}

//watch files for changes and update them
function watch() {
  gulp.watch(sassSources, sass);
  gulp.watch(jsSources, concatFiles);
}

//minifies HTML files and pipe them to 'dist' folder
function html(cb) {
  gulp.src('builds/development/*.html')
  .pipe(miniHtml())
  .pipe(gulp.dest('builds/dist/'))
  cb();
}

//minify compiled CSS and pipes it to 'dist'
function minifyCSS(cb) {
  gulp.src('builds/development/css/*.css')
  .pipe(cssnano())
  .pipe(gulp.dest('builds/dist/css'))
  cb();
}

//minify images and pipe to 'dist/images'
function minifyImages(cb) {
  gulp.src('builds/development/images/*.*')
  .pipe(imagemin([
  	imagemin.gifsicle({interlaced: true}),
  	imagemin.jpegtran({progressive: true}),
  	imagemin.optipng({optimizationLevel: 5}),
  	imagemin.svgo({
  		plugins: [
  			{removeViewBox: true},
  			{cleanupIDs: false}
  		]
  	})
  ]))
  .pipe(gulp.dest('builds/dist/images'))
  cb();
}
//prints message to the console
function defaultTask(cb) {
  gutil.log(`
      T!PE  by Rafael Freitas
      =======================
      copyright 2020
  `);
  cb();
}

// pipe song files from 'development/' to 'dist/'

function pipeSongs(cb){
  gulp.src('builds/development/audio/*.mp3')
  .pipe(gulp.dest('builds/dist/audio'))
  cb();
}

exports.watch = watch;
exports.default = gulp.series(defaultTask, html, minifyCSS, minifyImages, uglifyJs, pipeSongs);
