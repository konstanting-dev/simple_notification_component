const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browser = require('browser-sync');
var csscomb = require('gulp-csscomb');

gulp.task('server',function(done) {
    browser.init({
        server: './src'
    });
    done();
});

gulp.task('sass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(gulp.dest('src/css'));
});
gulp.task('watch',function() {
    gulp.watch('./src/index.html').on('change', browser.reload);
    gulp.watch('./src/sass/*.scss',['sass']).on('change', browser.reload);
});

gulp.task( 'build', ['server', 'sass', 'watch']);
