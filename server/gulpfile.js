import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('default', [], () => {
  gulp.watch('src/**/*.js', () => {
    gulp.run('build');
  });
});

gulp.task('prebuild', () => gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist'))
);
gulp.task('build', () => gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist'))
);
