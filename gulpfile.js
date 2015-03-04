'use strict';

var path = require('path');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var onError = function (error) {
    plugins.util.log(error);
    this.emit('end');
};

gulp.task('bower-css', function () {
    return gulp.src([
        'vendor/bootstrap/dist/css/bootstrap.css'
    ])
        .pipe(plugins.concat('vendor.min.css'))
        .pipe(plugins.csso())
        .pipe(gulp.dest('./public/css'))
});

gulp.task('bower-admin-js', function () {
    return gulp.src([
        //'bower_components/jquery/dist/jquery.js',
        //'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/ace-builds/src/ace.js',
        'bower_components/ace-builds/src/mode-php.js',
        'bower_components/ace-builds/src/mode-markdown.js',
        'bower_components/ace-builds/src/theme-textmate.js'
    ])
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify()).on('error', onError)
        .pipe(gulp.dest('./src/frapi/admin/public/js'))
});

gulp.task('bower-js-dev', function () {

});

gulp.task('bower-fonts', function() {

});

gulp.task('jade', function () {
    gulp.src('jade/public/**/*.jade')
        .pipe(plugins.data(
            function (file) {
                var root = path.relative(path.dirname(file.path).replace('jade/',''), 'public');
                if (root) {
                    root += '/';
                }
                return {
                    root: root
                }
            }
        ))
        .pipe(plugins.jade({
            pretty: true,
            basedir: path.join(__dirname, 'jade')
        })).on('error', onError)
        .pipe(gulp.dest('./public'))
});

gulp.task('less', function () {
    return gulp.src('less/app.less')
        .pipe(plugins.less()).on('error', onError)
        //.pipe(plugins.csso())
        //.pipe(plugins.rename({
        //    suffix: ".min"
        //}))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('server', function () {
    plugins.connect.server({
        'root': './',
        'port': 8000
    });
});

gulp.task('dev', ['server', 'watch']);

gulp.task('watch', function () {
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('jade/**/*.jade', ['jade']);
});

gulp.task('build', ['bower-css', 'bower-js', 'bower-fonts', 'bower-js-dev', 'jade', 'less']);

gulp.task('build-production', ['bower-css', 'bower-js', 'bower-fonts', 'jade', 'less']);

gulp.task('default', ['watch']);
