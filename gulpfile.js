
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var clean = require('gulp-clean');

var path = require('path');

var paths = {
    src: ['src/**/*.js'],
    transpiled: 'transpiled',

    // Must be absolute or relative to source map
    sourceRoot: path.join(__dirname, 'src'),
};

gulp.task('clean-scripts', function () {
  return gulp.src(paths.transpiled, {read: false})
    .pipe(clean());
});


gulp.task('transpile', ['clean-scripts'], function () {
    return gulp.src(paths.src)
        //.pipe(sourcemaps.init())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(babel())
        .pipe(sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
        .pipe(gulp.dest(paths.transpiled));
});

gulp.task('watch', function() {
    gulp.watch(paths.src, ['babel']);
});

gulp.task('default', ['watch']);
