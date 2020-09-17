var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var webpack = require('gulp-webpack');
var useref = require('gulp-useref');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');

var cache = require('gulp-cache');
var del = require('del');

gulp.task("js", function() {
    return gulp.src("app/js/main.js")
      .pipe(webpack({
          output: {
              filename: "[name].bundle.js",
          },
      }))
      .pipe(gulp.dest('app/js/'))
      .pipe(browserSync.stream());
  });

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('sass', function () {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
    gulp.watch("app/scss/*.scss", gulp.series(['sass']));
    gulp.watch("app/*.html").on("change", reload); 
    gulp.watch("app/js/main.js", gulp.series(['js'])); 
}));

// Tasks to build app into /dist

// gulp.task('useref', function(){
//     return gulp.src('app/*.html')
//       .pipe(useref())
//       .pipe(gulpIf('*.js', uglify()))
//       // Minifies only if it's a CSS file
//       .pipe(gulpIf('*.css', cssnano()))
//       .pipe(gulp.dest('dist'))
//   });
gulp.task('minify-js', () => {
    return gulp.src('app/js/main.bundle.js')
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js/'))
  });
  gulp.task('minify-css', () => {
    return gulp.src('app/css/styles.css')
      .pipe(cssnano())
      .pipe(gulp.dest('dist/css/'))
  });

  gulp.task('images', function(){
    return gulp.src('app/assets/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('dist/assets'))
  });
  gulp.task('icons', function(){
    return gulp.src('app/icons/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/icons'))
  });

  gulp.task('move-html', function(){
    return gulp.src('app/index.html')
    .pipe(gulp.dest('dist/'))
  });
  gulp.task('clean:dist', function() {
    return del.sync('dist');
  })

  gulp.task('build', gulp.series('sass', 'minify-js', 'minify-css', 'images', 'icons', 'move-html', function(done){
      done();
  }));