var gulp         = require('gulp');
var nunjucks     = require('gulp-nunjucks');
var concat       = require('gulp-concat');
var cssmin       = require('gulp-cssmin');
var uglify       = require('gulp-uglify');
var del          = require('del');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();

var path = {
    css:  'app/css/*.css',
    js: 'app/scripts/*.js',
    html: 'app/*.html',
    mock: 'app/mockapi/*.json',
    vendor: {
      css: 'app/vendor/css/*.css'
    },
    font: 'app/fonts/**/*',
    img: 'app/images/*',
    dist: {
      css:  'dist/css/',
      js: 'dist/scripts/',
      html: 'dist/',
      vendor: 'dist/vendor/css/',
      font: 'dist/fonts',
      img: 'dist/images/',
      mock: 'dist/mockapi/'
    }
};

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('css-min', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(concat('style.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('js-min', function () {
  return gulp.src(path.js)
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('img', function () {
  return gulp.src(path.img)
    .pipe(gulp.dest(path.dist.img));
});

gulp.task('mock', function () {
  return gulp.src(path.mock)
    .pipe(gulp.dest(path.dist.mock));
});


gulp.task('vendor-css', function () {
  return gulp.src(path.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(path.dist.vendor));
});

gulp.task('vendor-css-min', function () {
  return gulp.src(path.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.dist.vendor));
});

gulp.task('font', function () {
  return gulp.src(path.font)
    .pipe(gulp.dest(path.dist.font));
});


gulp.task('build', ['clean', 'html', 'css', 'js', 'vendor-css', 'img', 'mock', 'font']);
gulp.task('prod', ['clean', 'html', 'css-min', 'js-min', 'vendor-css-min', 'img', 'mock', 'font']);

gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.vendor.css, ['vendor-css']);
  gulp.watch(path.img, ['img']);
  gulp.watch(path.mock, ['mock']);
  gulp.watch(path.font, ['font']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
