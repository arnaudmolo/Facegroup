'use strict';

var gulp, del, path, $, dist, app, browserify, reactify, to5Browserify, fs, envify, exec, brShim;

del           = require('del');
fs            = require('fs');
path          = require('path');
gulp          = require('gulp');
exec          = require('child_process').exec;

$             = require('gulp-load-plugins')();

browserify    = require('browserify');
to5Browserify = require('6to5ify');
envify        = require('envify');
brShim        = require('browserify-shim');

dist          = './dist';
app           = './app/';

// Styles
gulp.task('styles-sass', function () {

  return gulp.src(app + 'styles/*.sass')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['./bower_components', 'node_modules'],
      compass: true
    }))
    .pipe(gulp.dest(dist + '/styles/'))
    .pipe($.size());

});

gulp.task('styles', function () {

  return gulp.src(app + 'styles/*.less')
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer({cascade: false, browsers: ['last 2 versions']}))
    .pipe(gulp.dest(dist + '/styles/'))
    .pipe($.size());

});

gulp.task('cordova-scripts', function(){

  return browserify({ debug: false })
    .transform(to5Browserify.configure({ modules: 'commonInterop', experimental: true}))
    .transform(envify)
    .transform(brShim)
    .require(app + 'scripts/main.js', { entry: true })
    .bundle()
    .pipe(fs.createWriteStream('./cordova/www/js/main.js'))
    .on('close', function(){exec('cd cordova && cordova build ios -d');});

});

gulp.task('copy-to-cordova', function(){

  gulp.src(dist + '/index.html')
    .pipe($.copy('./cordova/www', {prefix: 2}));

  gulp.src(dist + '/styles/styles.css')
    .pipe($.copy('./cordova/www/css', {prefix: 2}));

  return

});

gulp.task('scripts', function(){

  return browserify({ debug: false })
    .transform(to5Browserify.configure({ modules: 'commonInterop', experimental: true}))
    .transform(envify)
    .transform(brShim)
    .require(app + 'scripts/main.js', { entry: true })
    .bundle()
    .on('error', function(err){
      // print the error (can replace with gulp-util)
      console.log(err.message);
      // end this stream
      this.emit('end');
    })
    .pipe(fs.createWriteStream(dist + '/scripts/main.js'));

});

gulp.task('compress', ['scripts'], function(){

  return gulp.src(dist + '/scripts/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest(dist + '/scripts'))
    .pipe($.size());

});


gulp.task('html', function(){

  return gulp.src(app + '*.html')
    .pipe($.useref())
    .pipe(gulp.dest(dist))
    .pipe($.size());

});

gulp.task('images', function(){

  return gulp.src(app + 'images/**/*')
    .pipe($.cache($.imagemin({
      optilisationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(dist + '/images'))
    .pipe($.size());

});

// Clean
gulp.task('clean', function(cb){

  del([dist], {force: true}, cb);
  $.cache.clearAll();

});

// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower'], function(){

  return gulp.src(app + './*.html')
    .pipe($.useref.assets())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe(gulp.dest(dist));

});

// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default
gulp.task('default', ['clean', 'build']);

// Serve
gulp.task('serve', function(){

  gulp.src(dist)
    .pipe($.webserver({
      livereload: true,
      fallback: 'index.html',
      port: 9000
    }));

});

gulp.task('jshint', function(){

  return gulp.src(
    [app + './scripts/**/*.js',
         '!' + app + './scripts/utils/string-to-color.js'])
    .pipe($.react())
    .pipe($.jshint('./.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'));

});

// Bower
gulp.task('bower', function(){

  gulp.src(app + 'bower_components/**/*.js', {base: app + 'bower_components'})
    .pipe(gulp.dest(dist + '/bower_components'));

});

// App watcher
gulp.task('watch', ['html', 'scripts', 'images', 'styles-sass', 'serve'], function(){

  // Watch .html files
  gulp.watch(app + '*.html', ['html']);

  // Watch .sass
  gulp.watch(app + 'styles/*.{sass,scss,less}', ['styles-sass']);

  gulp.watch(app + 'scripts/**/*.{js,jsx}', ['scripts']);

  gulp.watch(app + 'images/**/*', ['images']);

});
