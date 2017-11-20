var path = "..";
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var notify = require("gulp-notify");

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "..",
        notify: false
    });

    gulp.watch(path + "/docs/scss/*.scss", ['sass']);
    gulp.watch(path + "/docs/js/vendors/*.js", ['concat']);
    gulp.watch(path + "/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src(path + "/docs/scss/*.scss")
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename("main.min.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path + "/docs/css/"))
        .pipe(browserSync.stream());
});

gulp.task('concat', function() {
    return gulp.src(path + "/docs/js/vendors/*.js")
        .pipe(concat("vendors.js"))
        .pipe(gulp.dest(path + "/docs/js/"));
});

gulp.task('default', ['serve']);
