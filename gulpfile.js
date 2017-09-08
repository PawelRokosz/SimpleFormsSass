 const gulp = require('gulp');
 const sass = require('gulp-sass');
 const autoprefixer = require('gulp-autoprefixer');
 const browserSync = require('browser-sync').create();
 const reload = browserSync.reload;
 const imagemin = require('gulp-imagemin');
 const cleanCSS = require('gulp-clean-css');
 const changed = require('gulp-changed');
 const sourcemaps = require('gulp-sourcemaps');

 gulp.task('browser-sync', function () {
    browserSync.init({
      server: './'
    });
 });

 gulp.task('styles', function () {
   return gulp.src('./assets/prod/styles/**/*.scss')
     .pipe(sourcemaps.init())
       .pipe(sass().on('error', sass.logError))
     .pipe(sourcemaps.write())
     .pipe(autoprefixer({
         browsers: ['last 5 versions'],
         cascade: false
     }))
     .pipe(gulp.dest('./assets/prod/css/'))
     .pipe(browserSync.stream());
 });

 gulp.task('minify-css', () => {
   return gulp.src('./assets/prod/css/main.css')
     .pipe(cleanCSS({compatibility: 'ie8'}))
     .pipe(gulp.dest('./assets/dist/css/'));
 });

 gulp.task('image', () =>
 	gulp.src('./assets/prod/images/*')
     .pipe(changed('./assets/dist/images'))
 		.pipe(imagemin())
 		.pipe(gulp.dest('./assets/dist/images/'))
 );

 gulp.task('watch', function(){
   gulp.watch('./assets/prod/js/*.js');
   gulp.watch('./assets/prod/css/main.css', ['minify-css']);
   gulp.watch('./assets/prod/styles/**/*.scss', ['styles']);
   gulp.watch('*.html').on('change', reload);
 });

 gulp.task('default', ['image', 'minify-css', 'styles', 'browser-sync', 'watch']);
