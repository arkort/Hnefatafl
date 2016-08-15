var gulp = require('gulp');
var ts = require('gulp-typescript');
var server = require('gulp-express');

gulp.task('ts', function () {
    gulp.src('./client/ts/*.ts')
    .pipe(ts({
        noImplicitAny: true
    }))
    .pipe(gulp.dest('./client/js/'));
});

gulp.task('server', function () {
    server.run(['server.js'], {}, false);
    gulp.watch('./client/ts/*.ts', ['ts']);
});

gulp.task('default', ["server"]);