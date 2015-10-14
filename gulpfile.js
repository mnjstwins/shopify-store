var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');

gulp.task('default', ['less']);

gulp.task('less', function () {
  gulp.src('less/*.less')
        .pipe(watch('less/*.less'))
        .pipe(less())
        .pipe(gulp.dest('public/css'));
});
