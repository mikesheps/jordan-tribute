// 'use strict'; 

import gulp from 'gulp';
import browserSync from 'browser-sync';
import stylus from 'gulp-stylus';
import sourcemaps from 'gulp-sourcemaps';
import jade from 'gulp-jade';
import plumber from 'gulp-plumber'
import todo from 'gulp-todo'

const defaultBrowser = 'google chrome canary'

browserSync.create();
// Static Server + watching scss/html files
//gulp.task('serve', ['stylus', 'jade'], function() {
gulp.task('serve', ['stylus'], function() {
  browserSync.init({
    server: "./",
    browser: defaultBrowser
  });

  gulp.watch("*.styl", ['stylus']);
  //gulp.watch("*.jade", ['jade']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('stylus', function() {
  return gulp.src("*.styl")
  	.pipe(plumber())
  	.pipe(sourcemaps.init())
    .pipe(stylus({compress: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {
  	title: "Michael Jordan Tribute",
  	para: "One of the best to ever play the game"
  };
 
  gulp.src('./*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest('./'))
});

// Default task to run
gulp.task('default', ['serve']);





////////////////
// Task: TODO //
////////////////

gulp.task('todo', () => {
 gulp.src(['./*.styl', './*.html'])
   .pipe(todo({
     customTags: ['NOTES']
   }))
   .pipe(gulp.dest('.'))
   // -> Will output a TODO.md with your todos
})
