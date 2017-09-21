const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');


gulp.task('browser-sync', function () {
  browserSync.init({
    server: './'
  });
});

gulp.task('styles', function () {
 return gulp.src('./src/assets/sass/**/*.scss')
   .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
   .pipe(sourcemaps.write())
   .pipe(autoprefixer({
       browsers: ['last 5 versions'],
       cascade: false
   }))
   .pipe(gulp.dest('./src/assets/css/'))
});

gulp.task('minify-css', () => {
 return gulp.src('./src/assets/css/main.css')
   .pipe(cleanCSS({compatibility: 'ie8'}))
   .pipe(gulp.dest('./dist/css/'))
   .pipe(browserSync.stream());
});

gulp.task('image', () =>
	gulp.src('src/assets/images/**.*')
		.pipe(imagemin({progressive: true}))
		.pipe(gulp.dest('dist/images'))
);

gulp.task("scripts", function() {
  return gulp.src(['src/assets/js/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat("all.min.js"))
    .pipe(uglify().on('error', function(e){
       console.log(e);
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist/js"))
});

gulp.task('watch', function(){
 gulp.watch('./src/assets/sass/**/*.scss', ['styles']);
 gulp.watch('./src/assets/css/main.css', ['minify-css']);
 gulp.watch('./**/*.html').on('change', reload);
});

gulp.task('default', ['image', 'styles', 'minify-css', 'browser-sync', 'watch']);
