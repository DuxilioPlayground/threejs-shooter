var gulp = require('gulp'),
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify');

var pkg = require('./package.json'),
    rootPaths = {
        www: 'js_public',
        dev: 'js_dev'
    },
    paths = {
        js: {
            src: rootPaths.dev+'/**/*.js',
            srcFile: rootPaths.dev+'/main.js',
            dest: rootPaths.www
        }
    };
 
gulp.task('connect', function(){
    connect.server({
        livereload: true,
        host: '0.0.0.0',
        port: 9000,
        root: __dirname
    });
});

gulp.task('watch', function(){
    gulp.watch(paths.js.src, ['browserify']);
});

gulp.task('browserify', function() {
    gulp.src(paths.js.srcFile)
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(connect.reload());
});

gulp.task('default', ['connect', 'watch']);
gulp.task('build', ['browserify']);