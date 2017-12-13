let gulp = require('gulp');
let runSequence = require('run-sequence');
let to5 = require('gulp-babel');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let paths = require('../paths');
let compilerOptions = require('../babel-options');
let assign = Object.assign || require('object.assign');

gulp.task('build-html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.output + 'es2015'))
        .pipe(gulp.dest(paths.output + 'commonjs'))
        .pipe(gulp.dest(paths.output + 'amd'))
        .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-css', function() {
    let plugins = [autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'ie >= 11'],
        cascade: true,
        flexbox: true,
        grid: true
    })];

    return gulp.src(paths.css)
        .pipe(postcss(plugins))
        .pipe(gulp.dest(paths.output + 'es2015'))
        .pipe(gulp.dest(paths.output + 'commonjs'))
        .pipe(gulp.dest(paths.output + 'amd'))
        .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-es2015', function() {
    return gulp.src(paths.source)
        .pipe(to5(assign({}, compilerOptions.es2015())))
        .pipe(gulp.dest(paths.output + 'es2015'));
});

gulp.task('build-commonjs', function() {
    return gulp.src(paths.source)
        .pipe(to5(assign({}, compilerOptions.commonjs())))
        .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-amd', function() {
    return gulp.src(paths.source)
        .pipe(to5(assign({}, compilerOptions.amd())))
        .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-system', function() {
    return gulp.src(paths.source)
        .pipe(to5(assign({}, compilerOptions.system())))
        .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build', function(callback) {
    return runSequence(
        'clean', ['build-html', 'build-css', 'build-es2015', 'build-commonjs', 'build-amd', 'build-system'],
        callback
    );
});
