var gulp                 = require('gulp');
var path                 = require('path');
var sourcemaps           = require('gulp-sourcemaps');
var browserSync          = require('browser-sync').create();

var sass                 = require('gulp-sass');
var autoprefixer         = require('gulp-autoprefixer');
var concat               = require('gulp-concat');
var rename               = require('gulp-rename');
var uglifycss            = require('gulp-uglifycss');

var browserify           = require('browserify');
var jshint               = require('gulp-jshint');
var stylish              = require('jshint-stylish');
var uglify               = require('gulp-uglify');
var babelify             = require('babelify');
var source               = require('vinyl-source-stream');
var buffer               = require('vinyl-buffer');
var preset_es2015        = require('babel-preset-es2015');
var minify               = require('babel-preset-minify');
var plugin_destructuring = require('babel-plugin-transform-es2015-destructuring');
var plugin_parameters    = require('babel-plugin-transform-es2015-parameters');
var plugin_spread        = require('babel-plugin-transform-object-rest-spread');

var config = {
    base:       './',
    templates:  'templates/**/*.html',
    sass: {
        entry:  'scss/main.scss',
        input:  ['scss/**/*.scss', 'templates/**/*.scss'],
        output: 'assets/'
    },
    js: {
        entry:  'js/main.js',
        input:  ['js/**/*.js', 'templates/**/*.js'],
        output: 'assets/'
    }
}

gulp.task('sass', function() {
    console.log('\r\n>>>>>>>>>>>> RELOAD <<<<<<<<<<<<<');
    return gulp.src(config.sass.entry)
        .pipe(sass().on('error', function (err) {
            console.error("Problem with Sass: ", err.message);
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(concat('knards.css'))
        .pipe(uglifycss({
            "max-line-len": 80
        }))
        .pipe(gulp.dest(config.sass.output))
        .pipe(browserSync.stream());
});

gulp.task('lint', function() {
    console.log('\r\n>>>>>>>>>>>> RELOAD <<<<<<<<<<<<<');
    return gulp.src(config.js.input)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('scripts', ['lint'], function() {
    return browserify({
            entries: config.js.entry,
            debug: true
        })
        .transform("babelify", {
            presets: [
                preset_es2015,
                minify
            ],
            plugins: [
                plugin_destructuring,
                plugin_parameters,
                plugin_spread
            ]
        })
        .bundle()
        .on('error', function (err) {
            console.log("Problem with JS: " + err.toString());
            this.emit('end');
        })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(rename('knards.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.js.output));
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: config.base
        },
        port: 3987,
        ui: {
            port: 3988
        },
        notify: false,
        open: false
    });

    gulp.watch(config.sass.input, ['sass']);
    gulp.watch(config.js.input, ['scripts', browserSync.reload]);
    gulp.watch(config.templates).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
