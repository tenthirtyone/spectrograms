var gulp      = require('gulp'),
  concat      = require('gulp-concat'),
  del         = require('del'),
  htmlreplace = require('gulp-html-replace'),
  jshint      = require('gulp-jshint'),
  open        = require('gulp-open'),
  os          = require('os'),
  rename      = require('gulp-rename'),
  scss        = require('gulp-sass'),
  merge       = require('merge-stream'),
  livereload  = require('gulp-livereload'),
  plumber     = require('gulp-plumber'),
  uglify      = require('gulp-uglify');

var buildDir = '../build/';

var browser = os.platform() === 'linux' ? 'google-chrome' : (
os.platform() === 'darwin' ? 'google chrome' : (
os.platform() === 'win32' ? 'chrome' : 'firefox'));

var htmlReplaceStrings = {
        'css': 'styles/styles.css',
        'scripts': 'scripts/scripts.js',
        'vendors': 'scripts/vendors.js'
    };

var vendorFiles = [
  'node_modules/angular/angular.js',
  'node_modules/angular-ui-router/release/angular-ui-router.js',
  'node_modules/ngstorage/ngStorage.js',
  'node_modules/jquery/dist/jquery.js',
  'node_modules/bootstrap/dist/js/bootstrap.js',
  'node_modules/jquery-ui-dist/jquery-ui.js',
  'node_modules/sjcl/sjcl.js',
  'node_modules/node-vibrant/dist/vibrant.js'
];

var vendorCSS = [
  'node_modules/bootstrap/dist/css/bootstrap.css',
  'node_modules/font-awesome/css/font-awesome.css'

]

gulp.task('browse', function(){
  gulp.src('localhost')
    .pipe(open({app: browser}));
});

gulp.task('clean', function(){
  return del(buildDir, {force: true});
});

gulp.task('default', ['move', 'scss', 'vendor-css', 'scripts', 'views', 'vendor', 'images', 'fonts'], function(){
  return ;
});

gulp.task('images', ['clean'], function() {
  return gulp.src(['img/**/*'])
    .pipe(gulp.dest(buildDir + 'img/'))
});

gulp.task('fonts', ['clean'], function() {
  return gulp.src(['fonts/**/*'])
    .pipe(gulp.dest(buildDir + 'fonts/'))
});

gulp.task('lint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('move', ['clean'], function() {
  gulp.src('favicon.png')
    .pipe(gulp.dest(buildDir))
    .pipe(livereload());

 return gulp.src('index.html')
  .pipe(htmlreplace(htmlReplaceStrings))
  .pipe(gulp.dest(buildDir))
  .pipe(livereload());
});

gulp.task('scss', ['clean'], function() {
  var cssStream = gulp.src(['js/**/*.css', 'styles/*.css'])
    .pipe(plumber())
    .pipe(concat('css-styles.css'))
    .pipe(livereload());

  var scssStream = gulp.src(['js/**/*.scss', 'styles/*.scss'])
    .pipe(plumber())
    .pipe(scss())
    .pipe(concat('scss-styles.css'))
    .pipe(livereload());

  var mergeStream = merge(cssStream, scssStream)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(buildDir + 'styles/'))
    .pipe(livereload());
});

gulp.task('vendor-css', ['clean'], function() {
  gulp.src(vendorCSS)
    .pipe(plumber())
    .pipe(scss())
    .pipe(concat('vendor-styles.css'))
    .pipe(gulp.dest(buildDir + 'styles/'))
    .pipe(livereload());
});

gulp.task('scripts', ['clean'], function(){
  return gulp.src([
    'app.js',
    'js/**/*.module.js',
    'js/**/*.services.js',
    'js/**/*.controllers.js',
    'js/**/*.js'

  ])
    .pipe(concat('scripts.js'))
    .pipe(plumber())
    //.pipe(uglify())
    .pipe(gulp.dest(buildDir + 'scripts/'))
    .pipe(livereload());
})

gulp.task('views', ['clean'], function(){
  return gulp.src('**/*.html')
    .pipe(plumber())
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(buildDir + 'views'))
    .pipe(livereload());

})

gulp.task('vendor', ['clean'], function(){
  return gulp.src(vendorFiles)
      .pipe(plumber())
      .pipe(concat('vendors.js'))
      //.pipe(uglify())
      .pipe(gulp.dest(buildDir + 'scripts/'));
})

gulp.task('watch', function() {
    gulp.watch('**/*.js', ['default']);
    gulp.watch('**/*.scss', ['default']);
    gulp.watch('**/*.html', ['default']);
});
