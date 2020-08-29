var gulp = require('gulp')
var sass = require('gulp-sass')
var source = require('vinyl-source-stream')
var rename = require('gulp-rename')
var babel = require('babelify')
var browserify = require('browserify')

gulp.task('styles', function () {
  return gulp
    .src('./resources/css/index.scss')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public'))
})

gulp.task('browserify', function () {
  return browserify('./resources/js/index.js')
    .transform(babel)
    .bundle()
    .pipe(source('index.js'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('public'))
})

gulp.task('watch', function () {
  gulp.watch('./resources/js/*.js', gulp.parallel('browserify'))
})

gulp.task('default', gulp.parallel('styles', 'browserify'))
