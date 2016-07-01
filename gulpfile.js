var gulp =  require('gulp'),
imagemin =  require('gulp-imagemin'),
clear = require('gulp-clean'),
// concat = require('gulp-concat'),
// htmlReplace = require('gulp-html-replace'),
uglify = require('gulp-uglify'),
usemin = require('gulp-usemin'),
cssmin = require('gulp-cssmin'),
jshint = require('gulp-jshint'),
browserSync = require('browser-sync'),
jshintStylish  = require('jshint-stylish'),
csslint = require('gulp-csslint'),
autoprefixer = require('gulp-autoprefixer');

var onChanges = function(){
    // gulp.start('build-img','usemin');
    browserSync.reload();
}


gulp.task('clean',function(){
  return gulp.src('dist')
    .pipe(clear());
});

gulp.task('copy',['clean'],function(){
  return gulp.src('src/**/*' )
    .pipe(gulp.dest('dist'));
})

gulp.task('build-img',function(){
  gulp.src('dist/img/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});




gulp.task('usemin', function() {
  return gulp.src('dist/**/*.html')
    .pipe(usemin({
      js: [uglify],
      css: [autoprefixer({
        browsers: ['last 5 versions']
      }),cssmin]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('server',function(){
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
  gulp.watch('src/**/*.js').on('change',function(event){
    gulp.src(event.path)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish));
  });

  gulp.watch('src/**/*.css').on('change',function(event){
    gulp.src(event.path)
    .pipe(csslint())
    .pipe(csslint.reporter());
  });

  gulp.watch('src/**/*').on('change',onChanges);




});

gulp.task("default",['copy'],function(){
  // gulp.start('build-img','build-js','build-css','build-html');
  gulp.start('build-img','usemin');
  // gulp.start('build-img');
});
