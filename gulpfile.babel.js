import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';


gulp.task('default', ['build']);

gulp.watch('server/src/**/*.js', ['build']);

// gulp.task('prebuild', () => gulp.src('server/src/**/*.js')
//   .pipe(babel())
//   .pipe(gulp.dest('server/build'))
// );

gulp.task('clean', () => del(['server/build/**/*', '!server/build'], { force: true }));

gulp.task('sourcemaps', () => gulp.src('server/src/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(concat('all.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('server/build')));

gulp.task('build', ['clean', 'sourcemaps'], () => gulp.src('server/src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('server/build')));
