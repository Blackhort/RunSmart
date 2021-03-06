const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('styles', function(){
    return gulp.src("src/sass/**/*.+(sass|scss|css)")
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .on('end', browserSync.reload);
});

gulp.task('watch', function(){
    gulp.watch("src/sass/**/*.+(sass|scss|css)", gulp.parallel("styles"))
    gulp.watch("src/*.html").on("change", gulp.parallel("html"))
    gulp.watch("src/mailer/**/*.php").on("change", gulp.parallel('php'))
    gulp.watch("src/js/**/*.js").on("change", gulp.parallel('scripts'));
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'))
        .on('end', browserSync.reload);
});

gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest('dist/js'))
        .on('end', browserSync.reload);
});

gulp.task('php', function() {
    return gulp.src("src/mailer/**/*.php")
        .pipe(gulp.dest('dist/mailer'))
        .on('end', browserSync.reload);
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', function() {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest('dist/icons'));
});

gulp.task('images', function() {
    return gulp.src("src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('default', gulp.parallel('server', 'styles', 'php', 'watch', 'html', 'scripts', 'fonts', 'icons', 'images'));